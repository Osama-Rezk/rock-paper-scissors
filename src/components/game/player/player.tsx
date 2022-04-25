import { OptionsEnum } from "../../../types";
import "./player.css";

interface playerProps {
  playerChoice: OptionsEnum | null;
  score: number;
}

export function Player(props: playerProps) {
  const { playerChoice, score, ...rest } = props;
  return (
    <div {...rest}>
      <div className="player-choice">
        {playerChoice ? playerChoice : "Waiting for selection"}
      </div>
      <h2>{score}</h2>
    </div>
  );
}
