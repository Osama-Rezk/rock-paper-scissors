import { render, screen } from "@testing-library/react";
import { ALL_OPTIONS } from "../game";
import { OptionItem } from "./";

describe("testing  OptionItem Component", () => {
  it("should Render Data Correctly and trigger click event", () => {
    const onClick = jest.fn();
    const option = ALL_OPTIONS[0];

    render(<OptionItem option={option} onClick={onClick} />);

    const OptionElement = screen.getByText(option.name);

    expect(OptionElement).toBeInTheDocument();

    OptionElement.click();

    expect(onClick).toBeCalledTimes(1);
  });
});
