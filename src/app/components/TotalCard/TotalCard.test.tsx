import { screen, render } from "@testing-library/react";
import TotalCard from ".";

const mockCard = { title: "Total Orders", value: "84,382", percent: "36" };

describe("#TotalCard Suite", () => {
  it("should render TotalCard component", () => {
    render(<TotalCard {...mockCard} />);

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
  });

  it("should render TotalCard component increase", () => {
    render(<TotalCard {...mockCard} />);

    const increaseElement = screen.getByTestId("increase-icon");
    expect(increaseElement).toBeInTheDocument();
  });

  it("should render TotalCard component decrease", () => {
    render(<TotalCard {...mockCard} decrease />);

    const decreaseElement = screen.getByTestId("decrease-icon");
    expect(decreaseElement).toBeInTheDocument();
  });
});
