import React from "react";
import './EndScreen.css';

// Component for rendering an End Screen with a "play again" button on game over

export default function EndScreen({ onRestartGame }) {
  return (
    <div className="EndScreen">
      <div className="end-text">
        Oh no, she's flown into a balloon and got stuck! 
        <br/>
        Lil Bird is okay, but needs to get home still!
      </div>
      <button onClick={onRestartGame} id="button">Play Again</button>
    </div>
  );
}
