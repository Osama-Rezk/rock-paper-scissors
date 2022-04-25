import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("testing Button  Component", () => {
  it("Button should Have Clicked", () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick}>click me</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
