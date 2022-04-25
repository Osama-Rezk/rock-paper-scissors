import { Option, OptionsEnum } from "../../../types";
import { OptionItem } from "../option/option";
import "./options-list.css";
interface OptionsListProps {
  options: Option[];
  play: (selectedOption?: OptionsEnum) => void;
}

export function OptionsList(props: OptionsListProps) {
  const { play, options } = props;

  function renderOptions() {
    return (
      <div data-testid="options-list" className="options-container">
        {options.map((option) => (
          <OptionItem
            key={option.value}
            option={option}
            onClick={() => play(option.value)}
          />
        ))}
      </div>
    );
  }

  return renderOptions();
}
