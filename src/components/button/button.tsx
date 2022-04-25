import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  onClickHandler?: (event: any) => void;
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
}
