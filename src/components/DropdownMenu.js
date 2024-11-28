import React from "react";

const DropdownMenu = ({ games, onSelectGame }) => {
  return (
    <select
      onChange={(e) => onSelectGame(e.target.value)}
      style={{ marginBottom: "20px" }}
    >
      <option value=''>Select a Game</option>
      {games.map((game, index) => (
        <option key={index} value={game}>
          {game}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
