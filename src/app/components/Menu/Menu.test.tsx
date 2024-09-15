import { screen, render } from "@testing-library/react";
import Menu from "./";

describe("#Menu Suite", () => {
  it("should render Menu component", () => {
    render(<Menu />);

    const menuElement = screen.getByTestId("menu");
    expect(menuElement).toBeInTheDocument();
  });
});
