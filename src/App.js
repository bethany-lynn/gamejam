import "./App.css";
import EndScreen from "./ui_components/EndScreen";
import GameCanvas from "./game_canvas_components/GameCanvas";
import React, { useState } from "react";

function App(props) {
  let [gameOver, setGameOver] = useState(false);

  return (
    <>
      <h1>hello birdies</h1>
      {!gameOver ? <GameCanvas gameOver={gameOver} setGameOver={setGameOver} /> : <EndScreen />}
    </>
  );
}

export default App;
