import { screen, render } from "@testing-library/react";
import Menu from "./";
import StoreProvider from "@/app/StoreProvider";

describe("#Menu Suite", () => {
  it("should render Menu component", () => {
    render(
      <StoreProvider>
        <Menu />
      </StoreProvider>
    );

    const menuElement = screen.getByTestId("menu");
    expect(menuElement).toBeInTheDocument();
  });
});
