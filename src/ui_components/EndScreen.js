import React from "react";
import './EndScreen.css';

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
