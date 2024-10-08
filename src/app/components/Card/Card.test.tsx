import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("#Card Suite", () => {
  it("should render the Card component", () => {
    render(<Card>Teste</Card>);

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toBeInTheDocument();
  });

  it("should Card component be able to render ReactNode as content", () => {
    render(
      <Card>
        <p>Card test</p>
      </Card>
    );

    const cardElement = screen.getByTestId("card").children[0];
    expect(cardElement.tagName).toBe("P");
    expect(cardElement.textContent).toBe("Card test");
  });
});
