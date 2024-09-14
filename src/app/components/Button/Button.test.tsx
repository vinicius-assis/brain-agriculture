import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("#Button Suite", () => {
  it("should render the Button component", () => {
    render(<Button>Button Test</Button>);

    const buttonElement = screen.getByRole("button");
    const buttonClassName = buttonElement.className;

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toEqual("Button Test");
    expect(buttonClassName).toContain("w-52");
    expect(buttonClassName).toContain("h-10");
  });

  it("should render the Button component with variant sm", () => {
    render(<Button variant="sm">Button Test23</Button>);

    const buttonElement = screen.getByRole("button");
    const buttonClassName = buttonElement.className;

    expect(buttonElement.textContent).toEqual("Button Test23");
    expect(buttonClassName).toContain("w-32");
    expect(buttonClassName).toContain("h-9");
  });
});
