import React, { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean; // true for multiple selection, false for single
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiSelect = true,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const sorted = [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Row selection
  const handleSelectRow = (row: T) => {
    let newSelected: T[] = [];
    if (selectedRows.includes(row)) {
      newSelected = selectedRows.filter((r) => r !== row);
    } else {
      newSelected = multiSelect
        ? [...selectedRows, row]
        : [row]; // single selection mode
    }
    setSelectedRows(newSelected);
    onRowSelect && onRowSelect(newSelected);
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center p-4" role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <div className="text-center p-4 text-gray-500" role="alert">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="p-2 border-b"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 border-b cursor-pointer select-none"
                onClick={() => col.sortable && handleSort(col.dataIndex)}
                scope="col"
                aria-sort={
                  sortKey === col.dataIndex
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <div className="flex items-center justify-between">
                  {col.title}
                  {col.sortable && sortKey === col.dataIndex && (
                    <span>{sortOrder === "asc" ? "⬆️" : "⬇️"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedRows.includes(row)
                  ? "bg-blue-100 dark:bg-blue-900"
                  : ""
              }`}
            >
              {selectable && (
                <td className="p-2 border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleSelectRow(row)}
                    aria-label="Select row"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="p-2 border-b"
                  aria-label={`${col.title}: ${row[col.dataIndex]}`}
                >
                  {row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
