import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable, { Column } from "../DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

describe("DataTable Component", () => {
  test("renders correct number of rows", () => {
    render(<DataTable data={data} columns={columns} />);
    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows).toHaveLength(data.length + 1);
  });

  test("renders empty state", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  test("renders loading state", () => {
    render(<DataTable data={data} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("row selection works (single)", async () => {
    const user = userEvent.setup();
    let selectedRows: User[] = [];
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        multiSelect={false}
        onRowSelect={(rows) => (selectedRows = rows)}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(selectedRows).toHaveLength(1);
    await user.click(checkboxes[1]);
    expect(selectedRows).toHaveLength(1); // single selection
  });

  test("row selection works (multiple)", async () => {
    const user = userEvent.setup();
    let selectedRows: User[] = [];
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        multiSelect
        onRowSelect={(rows) => (selectedRows = rows)}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    expect(selectedRows).toHaveLength(2);
  });

  test("column sorting works", async () => {
    render(<DataTable data={data} columns={columns} />);
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);
    // Sorted ascending, Alice first
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent("Alice");
    fireEvent.click(nameHeader);
    // Sorted descending, Bob first
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent("Bob");
  });
});
