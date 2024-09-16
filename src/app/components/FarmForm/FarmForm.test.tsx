import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import FarmForm from ".";

describe("#FarmForm Suite", () => {
  const mockOnClose = jest.fn();

  it("should render FarmForm component when show is true", () => {
    render(<FarmForm show={true} onClose={mockOnClose} />);

    const menuElement = screen.getByTestId("farm-form");
    expect(menuElement).toBeInTheDocument();
  });

  it("should not render FarmForm component when show is false", () => {
    render(<FarmForm show={false} onClose={mockOnClose} />);

    const menuElement = screen.getByTestId("farm-form");
    expect(menuElement).toHaveClass("-translate-x-[100%]");
  });

  it("should display validation errors when form is submitted with invalid data", async () => {
    render(<FarmForm show={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("Document is invalid")).toBeInTheDocument();
      expect(screen.getByText("Producer Name is required")).toBeInTheDocument();
      expect(screen.getByText("Farm Name is required")).toBeInTheDocument();
      expect(screen.getByText("City is required")).toBeInTheDocument();
      expect(screen.getByText("State is required")).toBeInTheDocument();
    });
  });
});
