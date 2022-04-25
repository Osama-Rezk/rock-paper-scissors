export enum OptionsEnum {
  Paper = "paper",
  Rock = "rock",
  Scissors = "scissors",
}

export type Option = {
  name: string;
  img?: string;
  value: OptionsEnum;
};

export enum RoundResult {
  Tie,
  PlayerOneWin,
  PlayerTwoWin,
}
export const resultsMapPlayerMode: Record<RoundResult, string> = {
  [RoundResult.Tie]: "Tie",
  [RoundResult.PlayerOneWin]: "You Win",
  [RoundResult.PlayerTwoWin]: "You Lose",
};

export const resultsMapAutomaticMode: Record<RoundResult, string> = {
  [RoundResult.Tie]: "Tie",
  [RoundResult.PlayerOneWin]: "Computer One Win",
  [RoundResult.PlayerTwoWin]: "Computer Two Win",
};
