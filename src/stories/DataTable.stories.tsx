import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import DataTable, { DataTableProps, Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default {
  title: "Components/DataTable",
  component: DataTable,
  decorators: [
    (Story) => <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">{Story()}</div>,
  ],
} as Meta;

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "role", title: "Role", dataIndex: "role" },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Editor" },
];

const Template: Story<DataTableProps<User>> = (args) => {
  const [selected, setSelected] = useState<User[]>([]);
  return <DataTable {...args} onRowSelect={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  columns,
};

export const Selectable = Template.bind({});
Selectable.args = {
  data: sampleData,
  columns,
  selectable: true,
};

export const Loading = Template.bind({});
Loading.args = {
  data: sampleData,
  columns,
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns,
};

// Dark Mode Stories
export const DarkModeDefault = Template.bind({});
DarkModeDefault.args = {
  data: sampleData,
  columns,
};
DarkModeDefault.parameters = {
  backgrounds: { default: "dark" },
};

export const DarkModeSelectable = Template.bind({});
DarkModeSelectable.args = {
  data: sampleData,
  columns,
  selectable: true,
};
DarkModeSelectable.parameters = {
  backgrounds: { default: "dark" },
};

export const DarkModeEmpty = Template.bind({});
DarkModeEmpty.args = {
  data: [],
  columns,
};
DarkModeEmpty.parameters = {
  backgrounds: { default: "dark" },
};

export const DarkModeLoading = Template.bind({});
DarkModeLoading.args = {
  data: sampleData,
  columns,
  loading: true,
};
DarkModeLoading.parameters = {
  backgrounds: { default: "dark" },
};
