import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OptionsEnum } from "../../types";
import { Game } from "./game";

//since computer choice is a random process so we must mock it
jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  getRandomItemFromArray: () => ({
    name: "Scissors",
    value: "scissors",
    img: "",
  }),
}));

jest.spyOn(window, "alert").mockImplementation(() => {});

const sleep = (t: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, t);
  });

describe("testing Game  Component", () => {
  it("Game elements Is Rendered Correctly", () => {
    render(<Game winningScore={3} />);

    expect(screen.getByTestId("options-list")).toBeInTheDocument();
    expect(screen.getByTestId("player-one")).toBeInTheDocument();
    expect(screen.getByTestId("player-two")).toBeInTheDocument();
  });

  it("User Can Switch the Mode", () => {
    render(<Game winningScore={3} />);

    expect(screen.getByText("You Vs Computer")).toBeInTheDocument();

    const switchButton = screen.getByRole("button", {
      name: /switch mode/i,
    });

    act(() => {
      switchButton.click();
    });

    expect(screen.getByText("Computer VS Computer")).toBeInTheDocument();
  });

  /*
   1. we make Player one choose rock By clicking on Rock option 
   2. We Mocked the computer choice so computer choice will be scissors
   3. Assert that player one choice are rendered correctly 
   4. Since player One will win so we will Assert that his score is 1
       and the computer Score is 0
   5. the round results should By "You win" (match snap shot)
   5. Reset the Game And make sure all score are zeros 
  
  */

  it("User Can Player And Reset Game", async () => {
    const user = userEvent.setup();

    render(<Game winningScore={3} />);

    const playOneElementContainer = within(screen.getByTestId("player-one"));

    const playTwoElementContainer = within(screen.getByTestId("player-two"));

    const optionButton = screen.getByRole("button", {
      name: /rock/i,
    });

    await user.click(optionButton);

    expect(
      playOneElementContainer.getByText(OptionsEnum.Rock)
    ).toBeInTheDocument();

    expect(playOneElementContainer.getByRole("heading")).toHaveTextContent("1");

    expect(
      playTwoElementContainer.getByText(OptionsEnum.Scissors)
    ).toBeInTheDocument();

    expect(playTwoElementContainer.getByRole("heading")).toHaveTextContent("0");

    expect(screen.getByTestId("round-result")).toMatchSnapshot();

    const resetButton = screen.getByRole("button", {
      name: /reset/i,
    });

    await user.click(resetButton);

    expect(screen.getAllByText("0")).toBeTruthy();
  });

  /*
  1. press the rock three times 
  2. assert that player one score is displayed as three
      and  player two score is zero 
  3. assert the alert() will be called after player one
     reach to WINNING_SCORE
  */
  it("Player one will one the game and show alert", async () => {
    const user = userEvent.setup();
    const WINNING_SCORE = 3;

    render(<Game winningScore={WINNING_SCORE} />);

    const playOneElementContainer = within(screen.getByTestId("player-one"));

    const playTwoElementContainer = within(screen.getByTestId("player-two"));

    const optionButton = screen.getByRole("button", {
      name: /rock/i,
    });

    for (let i = 0; i < WINNING_SCORE; i++) {
      await user.click(optionButton);
    }

    expect(playOneElementContainer.getByRole("heading")).toHaveTextContent("3");

    expect(playTwoElementContainer.getByRole("heading")).toHaveTextContent("0");

    await act(async () => {
      await sleep(100);
      expect(window.alert).toBeCalled();
    });
  });
});
