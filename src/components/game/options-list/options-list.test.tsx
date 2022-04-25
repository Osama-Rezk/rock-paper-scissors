import { render, screen } from "@testing-library/react";
import { ALL_OPTIONS } from "../game";
import { OptionsList } from "./";

describe("testing Options List  Component", () => {
  it("should Render 3 Options", () => {
    render(<OptionsList options={ALL_OPTIONS} play={() => {}} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("options-list").children.length).toBe(3);
  });
});
