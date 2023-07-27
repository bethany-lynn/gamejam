import "./App.css";
import EndScreen from "./ui_components/EndScreen";
import GameCanvas from "./game_canvas_components/GameCanvas";
import React, { useState } from "react";

function App(props) {
  let [gameOver, setGameOver] = useState(false);
  let [score, setScore] = useState(0);

  return (
    <>
      <h1>hello birdies</h1>
      <h2>{score}</h2>
      <img src="/sprites/BalloonSprites.png" alt="BalloonSprites" />
      {!gameOver ? <GameCanvas gameOver={gameOver} setGameOver={setGameOver} setScore={setScore} /> : <EndScreen />}
    </>
  );
}

export default App;



  // function drawProjectile(
  //   ctx,
  //   xProjectile,
  //   yProjectile,
  //   projectileWidth,
  //   projectileHeight
  // ) {
  //   if (!(ctx instanceof CanvasRenderingContext2D)) {
  //     console.error("Invalid context");
  //     return;
  //   }
  //   ctx.fillStyle = "#000000";
  //   ctx.fillRect(xProjectile, yProjectile, projectileWidth, projectileHeight);
  // }
  // let birdWidth = 40;
  // let birdHeight = 40;

      // let frameCount = 0;
    // let animationFrameId;
        // const speed = 7;
            // let positionsX = []; // Array to store X positions for each row