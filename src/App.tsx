import { Game } from "./components/game";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Game winningScore={3} />
    </div>
  );
}

export default App;
