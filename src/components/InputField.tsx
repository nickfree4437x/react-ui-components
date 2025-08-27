import React, { useState, useEffect } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  theme?: "light" | "dark";
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  showPasswordToggle = false,
  theme = "light",
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  const handleClear = () => {
    setInputValue("");
    onChange && onChange({ target: { value: "" } } as any);
  };

  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const baseStyle =
    "w-full rounded-md transition duration-150 focus:outline-none focus:ring-2";

  const sizeStyle = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantStyle = {
    filled:
      "bg-gray-100 border border-gray-300 text-black focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400",
    outlined:
      "border border-gray-300 bg-transparent text-black focus:ring-blue-500 dark:border-gray-700 dark:bg-transparent dark:text-white dark:focus:ring-blue-400",
    ghost:
      "border-b border-gray-300 bg-transparent text-black focus:ring-blue-500 dark:border-b dark:border-gray-700 dark:text-white dark:focus:ring-blue-400",
  };

  const invalidStyle = invalid
    ? "border-red-500 focus:ring-red-500"
    : "";

  const disabledStyle = disabled
    ? "bg-gray-200 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:text-gray-400"
    : "";

  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="mb-1 font-medium" aria-label={label}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={`${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]} ${invalidStyle} ${disabledStyle} pr-10`}
        />
        {loading && (
          <div className="absolute right-2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}
        {showClearButton && inputValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        )}
        {showPasswordToggle && type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
