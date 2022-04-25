import { Option } from "../../../types";
import { Button } from "../../button";
import "./option.css";

interface OptionProps {
  option: Option;
  onClick: () => void;
  label?: string;
}

export function OptionItem(props: OptionProps) {
  const { option, onClick } = props;
  const { name } = option;
  return (
    <Button className="option-container" onClick={onClick}>
      <div className="option">
        <h1>{name}</h1>
      </div>
    </Button>
  );
}
