import {
  resultsMapPlayerMode,
  OptionsEnum,
  resultsMapAutomaticMode,
  RoundResult,
} from "../types";

export function chooseRandomIndexFromTheArray(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

/*
how to Determine the winner ? 

-the Options Will be presented in a graph 
 if a node in graph point to another node 
 then the first will win for example 
 if scissors point to  (have an edge) Paper      
 then scissors will win 

-that will make easy to extend to lizard and spock
 you will just add another node and edges to the 
 graph and the Logic will be the same 


   rock: ["scissors", "lizard"],
  scissors: ["paper", "lizard"],
  paper: ["rock", "spock"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],

*/

const weaponsGraph: Record<string, string[]> = {
  [OptionsEnum.Rock]: [OptionsEnum.Scissors],
  [OptionsEnum.Scissors]: [OptionsEnum.Paper],
  [OptionsEnum.Paper]: [OptionsEnum.Rock],
};

export function getRoundResults(
  playerOneOption: OptionsEnum,
  playerTwoOption: OptionsEnum
): RoundResult {
  if (playerOneOption === playerTwoOption) return RoundResult.Tie;

  if (weaponsGraph[playerOneOption].includes(playerTwoOption))
    return RoundResult.PlayerOneWin;

  return RoundResult.PlayerTwoWin;
}

export function getCurrentResultsDescription(
  playerOneOption: OptionsEnum,
  playerTwoOption: OptionsEnum,
  isAutomatic: boolean
) {
  const currentRoundResult = getRoundResults(playerOneOption, playerTwoOption);

  const descriptionMap = getDescriptionMapByMode(isAutomatic);

  return descriptionMap[currentRoundResult];
}

export function getDescriptionMapByMode(isAutomatic: boolean) {
  if (isAutomatic) {
    return resultsMapAutomaticMode;
  }

  return resultsMapPlayerMode;
}

export function getRandomItemFromArray<T>(options: T[]) {
  return options[chooseRandomIndexFromTheArray(options.length)];
}
