import { useEffect, useState } from "react";

import { OptionsEnum, Option, RoundResult } from "../../types";
import {
  getCurrentResultsDescription,
  getDescriptionMapByMode,
  getRandomItemFromArray,
  getRoundResults,
} from "../../utils";
import { Button } from "../button";
import { OptionsList } from "./options-list";
import { Player } from "./player";

import "./game.css";

export const ALL_OPTIONS: Option[] = [
  {
    name: "Paper",
    value: OptionsEnum.Paper,
  },
  {
    name: "Rock",
    value: OptionsEnum.Rock,
  },
  {
    name: "Scissors",
    value: OptionsEnum.Scissors,
  },
];

interface GameProps {
  winningScore: number;
}

export function Game({ winningScore }: GameProps) {
  const [playerOneOption, setPlayerOneOption] = useState<OptionsEnum | null>(
    null
  );
  const [playerTwoOption, setPlayerTwoOption] = useState<OptionsEnum | null>(
    null
  );

  const [playerOneScore, setPlayerOneScore] = useState<number>(0);
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

  const [isAutomatic, setIsAutomatic] = useState<boolean>(false);

  function play(selectedOption?: OptionsEnum) {
    const playerOneChoice =
      selectedOption || getRandomItemFromArray<Option>(ALL_OPTIONS).value;
    const playerTwoChoice = getRandomItemFromArray<Option>(ALL_OPTIONS).value;

    setPlayerOneOption(playerOneChoice);

    setPlayerTwoOption(playerTwoChoice);

    const roundResult = getRoundResults(playerOneChoice, playerTwoChoice);

    if (roundResult === RoundResult.Tie) return;

    if (roundResult === RoundResult.PlayerOneWin) {
      setPlayerOneScore((prevScore) => prevScore + 1);
    } else {
      setPlayerTwoScore((prevScore) => prevScore + 1);
    }
  }

  useEffect(() => {
    if (playerOneScore === winningScore || playerTwoScore === winningScore) {
      const map = getDescriptionMapByMode(isAutomatic);
      setTimeout(() => {
        alert(
          map[
            playerOneScore > playerTwoScore
              ? RoundResult.PlayerOneWin
              : RoundResult.PlayerTwoWin
          ]
        );
        reset();
      }, 10);
    }
  }, [playerOneScore, playerTwoScore, isAutomatic, winningScore]);

  function toggleMode() {
    reset();
    setIsAutomatic(!isAutomatic);
  }

  function reset() {
    setPlayerOneOption(null);
    setPlayerTwoOption(null);

    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  }

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>

      <div className="mode-container">
        <h1>{isAutomatic ? "Computer VS Computer" : "You Vs Computer"}</h1>
        <div className="control-container">
          <Button className="btn-primary" onClick={toggleMode}>
            Switch Modes
          </Button>
          <Button className="btn-danger" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="arena-container">
        <Player
          data-testid="player-one"
          playerChoice={playerOneOption}
          score={playerOneScore}
        />

        <div className="round-result" data-testid="round-result">
          {playerOneOption && playerTwoOption ? (
            <h2>
              {getCurrentResultsDescription(
                playerOneOption,
                playerTwoOption,
                isAutomatic
              )}
            </h2>
          ) : (
            <h2>Game</h2>
          )}
        </div>
        <Player
          data-testid="player-two"
          playerChoice={playerTwoOption}
          score={playerTwoScore}
        />
      </div>

      {!isAutomatic && <OptionsList play={play} options={ALL_OPTIONS} />}

      {isAutomatic && (
        <Button className="btn-primary" onClick={() => play()}>
          run
        </Button>
      )}
    </div>
  );
}
