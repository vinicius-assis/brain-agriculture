import { render, screen } from "@testing-library/react";
import EmptyMessage from ".";

describe("#EmptyMessage Suite", () => {
  it("should render EmptyMessage component", () => {
    render(<EmptyMessage />);

    const messageElement = screen.getByText("No data found");
    expect(messageElement).toBeInTheDocument();
  });

  it("should have the correct styles applied", () => {
    render(<EmptyMessage />);

    const typographyElement = screen.getByText("No data found");
    expect(typographyElement).toHaveClass(
      "text-lg tracking-wider text-gray-500"
    );
  });

  it("should have the correct container styles", () => {
    render(<EmptyMessage />);

    const containerElement = screen.getByText("No data found").parentElement;
    expect(containerElement).toHaveClass("w-full text-center pt-20");
  });
});
