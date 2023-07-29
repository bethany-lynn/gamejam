import React from "react";
import './EndScreen.css';

export default function EndScreen({ onRestartGame }) {
  return (
    <div className="EndScreen">
      <button onClick={onRestartGame} id="button">Play Again</button>
    </div>
  );
}
