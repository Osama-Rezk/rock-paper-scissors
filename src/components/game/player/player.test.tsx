import { render, screen } from "@testing-library/react";
import { OptionsEnum } from "../../../types";
import { Player } from "./";

describe("testing  Player Component", () => {
  it("should Render Data Correctly name and score", () => {
    render(<Player playerChoice={OptionsEnum.Rock} score={0} />);
    const score = 0;

    expect(screen.getByText(OptionsEnum.Rock)).toBeInTheDocument();
    expect(screen.getByText(score.toString())).toBeInTheDocument();
  });
});
