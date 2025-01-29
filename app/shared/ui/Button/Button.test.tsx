import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/shared/ui/Button";

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button");
    expect(button).toHaveTextContent("Click Me");
  });

  it("renders the button with custom color, size, and design type", () => {
    render(
      <Button
        color="danger"
        size="lg"
        designType="secondary"
      >
        Danger Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Danger Button" });

    expect(button).toHaveClass("button", "danger", "lg", "secondary");
  });

  it('renders the button as a link when "as" is set to "link"', () => {
    render(
      <Button
        as="link"
        color="sky-blue"
      >
        Link Button
      </Button>
    );
    const link = screen.getByRole("link", { name: "Link Button" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("button", "sky-blue");
    expect(link).toHaveAttribute("href", "#"); // Default href
  });

  it("renders a loading spinner when loading is true", () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole("button", { name: "Loading Button" });
    const loader = button.querySelector(".loader"); // Loader class is applied

    expect(button).toHaveClass("loading");
    expect(loader).toBeInTheDocument();
  });

  it("disables the button and prevents onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button
        disabled
        onClick={handleClick}
      >
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button", { name: "Disabled Button" });

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders prefix and suffix elements", () => {
    render(
      <Button
        prefix={<span data-testid="prefix">🔍</span>}
        suffix={<span data-testid="suffix">✔️</span>}
      >
        Search
      </Button>
    );
    const prefix = screen.getByTestId("prefix");
    const suffix = screen.getByTestId("suffix");

    expect(prefix).toBeInTheDocument();
    expect(prefix).toHaveTextContent("🔍");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveTextContent("✔️");
  });

  it("triggers onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a badge when "showBadge" is true', () => {
    render(<Button showBadge>Button with Badge</Button>);
    const button = screen.getByRole("button", { name: "Button with Badge" });
    const badge = button.querySelector(".badge");

    expect(badge).toBeInTheDocument();
  });
});
