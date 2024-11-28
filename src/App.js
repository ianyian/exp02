import React, { useState } from "react";
import TicTacToe from "./components/TicTacToe";
import MemoryMatchingGame from "./components/MemoryMatchingGame";
import DropdownMenu from "./components/DropdownMenu";
import "./App.css";

function App() {
  const [selectedGame, setSelectedGame] = useState("");

  const games = ["Tic-Tac-Toe", "Memory Matching Game"];

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className='App'>
      <h1>Game Center</h1>
      <DropdownMenu games={games} onSelectGame={handleGameSelection} />
      <div>
        {selectedGame === "Tic-Tac-Toe" && <TicTacToe />}
        {selectedGame === "Memory Matching Game" && <MemoryMatchingGame />}
        {!selectedGame && <p>Please select a game from the dropdown menu!</p>}
      </div>
    </div>
  );
}

export default App;
