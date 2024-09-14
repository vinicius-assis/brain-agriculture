import { render, screen } from "@testing-library/react";
import Typography from "./index";

describe("#Typography Suite", () => {
  it("should render the Typography component as paragraph", () => {
    render(<Typography content="Typography Element" />);

    const element = screen.getByText("Typography Element");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
  });

  it("should render the Typography component as h1", () => {
    render(<Typography content="Typography Element" as="h1" />);

    const element = screen.getByText("Typography Element");
    expect(element.tagName).toBe("H1");
  });

  it("should render the Typography component as h4", () => {
    render(<Typography content="Typography Element" as="h4" />);

    const element = screen.getByText("Typography Element");
    expect(element.tagName).toBe("H4");
  });

  it("should Typography has a className equal test", () => {
    render(
      <Typography className="test" content="Typography Element" as="h4" />
    );

    const elementClass = screen.getByText("Typography Element").className;
    expect(elementClass).toBe("test");
  });
});
