import { render, screen } from "@testing-library/react";
import Typography from "./index";

describe("#Typography Suite", () => {
  it("should render the Typography component as paragraph", () => {
    render(<Typography>Typography Element</Typography>);

    const element = screen.getByText("Typography Element");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
  });

  it("should render the Typography component as h1", () => {
    render(<Typography as="h1">Typography Element</Typography>);

    const element = screen.getByText("Typography Element");
    expect(element.tagName).toBe("H1");
  });

  it("should render the Typography component as h4", () => {
    render(<Typography as="h4">Typography Element</Typography>);

    const element = screen.getByText("Typography Element");
    expect(element.tagName).toBe("H4");
  });

  it("should Typography has a className equal test", () => {
    render(
      <Typography className="test" as="h4">
        Typography Element
      </Typography>
    );

    const elementClass = screen.getByText("Typography Element").className;
    expect(elementClass).toBe("test");
  });
});
