import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";
import StoreProvider from "@/app/StoreProvider";

describe("#Navbar Suite", () => {
  it("should render the Navbar component", () => {
    render(
      <StoreProvider>
        <Navbar />
      </StoreProvider>
    );

    const menuIcon = screen.getByRole("button");
    expect(menuIcon).toBeInTheDocument();

    const logo = screen.getByText("Brain Agriculture");
    expect(logo).toBeInTheDocument();
  });

  it("should toggle the menu icon when clicked", () => {
    render(
      <StoreProvider>
        <Navbar />
      </StoreProvider>
    );

    const menuIcon = screen.getByRole("button");
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });
});
