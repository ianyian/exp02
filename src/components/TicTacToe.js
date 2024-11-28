import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // true for Player, false for Computer

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const makeComputerMove = () => {
    const emptySquares = board
      .map((value, index) => (value === null ? index : null))
      .filter((v) => v !== null);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length); // Pick a random empty square
      const newBoard = [...board];
      newBoard[emptySquares[randomIndex]] = "O"; // Computer is always "O"
      setBoard(newBoard);
      setIsPlayerTurn(true); // Switch turn back to player
    }
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || !isPlayerTurn) return; // Ignore clicks if the square is taken, there's a winner, or it's not the player's turn

    const newBoard = [...board];
    newBoard[index] = "X"; // Player is always "X"
    setBoard(newBoard);
    setIsPlayerTurn(false); // Switch turn to computer
  };

  useEffect(() => {
    if (!isPlayerTurn && !calculateWinner(board) && board.includes(null)) {
      const timer = setTimeout(() => makeComputerMove(), 1000); // Computer moves after a delay
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board]);

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.includes(null)
    ? isPlayerTurn
      ? "Your Turn (X)"
      : "Computer's Turn (O)"
    : "It's a Draw!";

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
  };

  return (
    <div>
      <h2>Tic-Tac-Toe: Player vs Computer</h2>
      <div style={{ marginBottom: "10px" }}>{status}</div>
      <div className='tic-tac-toe-board'>
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className='tic-tac-toe-cell'
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className='reset-button'>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
