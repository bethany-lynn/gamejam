import React from "react";

export default function EndScreen({ onRestartGame }) {
  return (
    <div>
      <button onClick={onRestartGame}>Play Again</button>
    </div>
  );
}
