import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../InputField";

describe("InputField Component", () => {
  test("renders with label and placeholder", () => {
    render(<InputField label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  test("shows helper text", () => {
    render(<InputField label="Email" helperText="This is helper" />);
    expect(screen.getByText("This is helper")).toBeInTheDocument();
  });

  test("shows error message when invalid", () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  test("input changes value", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };
    render(<InputField label="Username" value={value} onChange={handleChange} />);
    const input = screen.getByLabelText("Username");
    await user.type(input, "Ashish");
    expect(input).toHaveValue("Ashish");
  });

  test("clear button clears input", async () => {
    const user = userEvent.setup();
    render(<InputField label="Test" value="Hello" showClearButton onChange={() => {}} />);
    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
    await user.click(clearButton);
  });

  test("password toggle works", async () => {
    const user = userEvent.setup();
    render(
      <InputField
        label="Password"
        type="password"
        value="12345"
        showPasswordToggle
        onChange={() => {}}
      />
    );
    const toggleBtn = screen.getByRole("button", { name: /toggle password/i });
    expect(toggleBtn).toBeInTheDocument();
    await user.click(toggleBtn);
  });
});
