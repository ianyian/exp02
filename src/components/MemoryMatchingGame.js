import React, { useState, useEffect } from "react";
import "./MemoryMatchingGame.css";

const MemoryMatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const initialCards = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉"];
    const shuffledCards = initialCards.sort(() => Math.random() - 0.5);
    setCards(
      shuffledCards.map((value, index) => ({
        id: index,
        value,
        flipped: false,
      }))
    );
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const handleCardClick = (card) => {
    if (card.flipped || flippedCards.length === 2) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, card]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        setMatchedPairs((prevMatched) => prevMatched + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className='memory-game'>
      <h2>Memory Matching Game</h2>
      <p>Moves: {moves}</p>
      <div className='memory-board'>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped ? card.value : "❓"}
          </div>
        ))}
      </div>
      {matchedPairs === cards.length / 2 && (
        <div>
          <h3>Congratulations! You matched all pairs in {moves} moves!</h3>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchingGame;
