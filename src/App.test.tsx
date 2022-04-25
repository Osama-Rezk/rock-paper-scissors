import { render } from "@testing-library/react";
import App from "./App";

//Smoke testing
test("renders App with no Errors", () => {
  render(<App />);
});
