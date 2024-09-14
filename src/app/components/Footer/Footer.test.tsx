import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("#Footer Suite", () => {
  it.only("should render the Footer component", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    const textContent = screen.getByText("Designed and developed by");
    const linkElement = screen.getByRole("link");
    expect(footer).toBeInTheDocument();
    expect(textContent).toBeInTheDocument();

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/vinicius-assis"
    );
  });
});
