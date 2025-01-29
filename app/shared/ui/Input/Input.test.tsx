import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input"; // Adjust import path if necessary
import React from "react";

describe("Input Component", () => {
  it("renders the input with default props", () => {
    render(<Input name="test-input" />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "test-input");
  });

  it("renders the input with a label", () => {
    render(
      <Input
        name="test-input"
        label="Test Label"
      />
    );
    const label = screen.getByText("Test Label");
    const input = screen.getByLabelText("Test Label");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("renders the input with custom type", () => {
    render(
      <Input
        name="test-input"
        type="email"
      />
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");
  });

  it("renders a disabled input", () => {
    render(
      <Input
        name="test-input"
        disabled
      />
    );
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("renders a read-only input", () => {
    render(
      <Input
        name="test-input"
        readOnly
      />
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("readonly");
  });

  it("renders an input with a prefix and suffix", () => {
    render(
      <Input
        name="test-input"
        prefix={<span data-testid="prefix">🔍</span>}
        suffix={<span data-testid="suffix">✔️</span>}
      />
    );
    const prefix = screen.getByTestId("prefix");
    const suffix = screen.getByTestId("suffix");

    expect(prefix).toBeInTheDocument();
    expect(prefix).toHaveTextContent("🔍");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveTextContent("✔️");
  });

  it("renders an error message", () => {
    render(
      <Input
        name="test-input"
        error="This is an error"
      />
    );
    const errorMessage = screen.getByText("This is an error");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("form__control__text");
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <Input
        name="test-input"
        onChange={handleChange}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("New Value");
  });

  it("calls onFocus handler when input gains focus", () => {
    const handleFocus = jest.fn();
    render(
      <Input
        name="test-input"
        onFocus={handleFocus}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('renders a textarea when type is set to "textarea"', () => {
    render(
      <Input
        name="test-input"
        type="textarea"
      />
    );
    const textarea = screen.getByRole("textbox");

    expect(textarea.tagName).toBe("TEXTAREA");
  });
});
