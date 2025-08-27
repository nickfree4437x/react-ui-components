import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import InputField, { InputFieldProps } from "../components/InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  decorators: [
    (Story) => <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">{Story()}</div>,
  ],
} as Meta;

const Template: Story<InputFieldProps> = (args) => {
  const [value, setValue] = useState("");
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Username",
  placeholder: "Enter username",
  helperText: "This is helper text",
  variant: "outlined",
  size: "md",
};

export const Error = Template.bind({});
Error.args = {
  label: "Email",
  placeholder: "Enter email",
  invalid: true,
  errorMessage: "Invalid email address",
  size: "md",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Input",
  placeholder: "Cannot type here",
  disabled: true,
  size: "md",
};

export const Loading = Template.bind({});
Loading.args = {
  label: "Loading Input",
  placeholder: "Typing...",
  loading: true,
  size: "md",
};

export const PasswordToggle = Template.bind({});
PasswordToggle.args = {
  label: "Password",
  placeholder: "Enter password",
  type: "password",
  showPasswordToggle: true,
  size: "md",
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: "Clearable Input",
  placeholder: "Type something...",
  showClearButton: true,
  size: "md",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  label: "Dark Theme Input",
  placeholder: "Enter text",
  variant: "filled",
  size: "md",
  showClearButton: true,
  showPasswordToggle: true,
};
DarkTheme.parameters = {
  backgrounds: { default: "dark" },
};
