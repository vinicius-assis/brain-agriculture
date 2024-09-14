import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";

describe("#Navbar Suite", () => {
  it("should render the Navbar component", () => {
    render(<Navbar />);

    const menuIcon = screen.getByRole("button");
    expect(menuIcon).toBeInTheDocument();

    const logoImage = screen.getByAltText("Brain Agriculture icon");
    expect(logoImage).toBeInTheDocument();
  });

  it("should toggle the menu icon when clicked", () => {
    render(<Navbar />);

    const menuIcon = screen.getByRole("button");
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });
});
