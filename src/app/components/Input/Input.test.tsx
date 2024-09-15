import { screen, render } from "@testing-library/react";
import Input from ".";

describe("#Input Suite", () => {
  it("should render Input component", () => {
    render(<Input label="Name" />);

    const element = screen.getByTestId("input");
    expect(element).toBeInTheDocument();
  });
});
