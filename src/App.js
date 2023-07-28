// App.js

import "./App.css";
import EndScreen from "./ui_components/EndScreen";
import StartScreen from "./ui_components/StartScreen";
import GameCanvas from "./game_canvas_components/GameCanvas";
import React, { useState } from "react";

function App(props) {
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // access state value, current and updated

  const detectCollisionWithObstacle = (collisionOccurred) => {
    if (collisionOccurred) {
      setGameOver(true);
    }
  };


  // initialize and reset/start blank variable states
  const handleStartGame = () => { // start game with state of 3 variables
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };


  // restart the game after game over and reset score
  const handleRestartGame = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <>
      {gameStarted ? (
        <>
          <h1>hello birdies</h1>
          <h2>{score}</h2>
          {!gameOver ? (
            <GameCanvas
              gameOver={gameOver}
              setGameOver={setGameOver}
              setCollisionWithObstacle={detectCollisionWithObstacle}
              setScore={setScore}
            />
          ) : (
            <EndScreen onRestartGame={() => handleRestartGame()} /> // passing oRG prop to EndScreen component - invokes handle when arrow function called
          )}
        </>
      ) : (
        <StartScreen onStartGame={handleStartGame} /> // handleStartGame function as prop for component and called when button clicked
      )}
    </>
  );
}

export default App;

// import "./App.css";
// import EndScreen from "./ui_components/EndScreen";
// import StartScreen from "./ui_components/StartScreen";
// import GameCanvas from "./game_canvas_components/GameCanvas";
// import React, { useState } from "react";

// function App(props) {
//   let [gameOver, setGameOver] = useState(false);
//   let [score, setScore] = useState(0);

//   const detectCollisionWithObstacle = (collisionOccured) => {
//     if (collisionOccured) {
//       setGameOver(true);
//     }
//   };

//   return (
//     <>
//       <h1>hello birdies</h1>
//       <h2>{score}</h2>
//       {!gameOver ? (
//         <GameCanvas
//           gameOver={gameOver}
//           setGameOver={setGameOver}
//           setCollisionWithObstacle={detectCollisionWithObstacle}
//           setScore={setScore}
//         />
//       ) : (
//         <EndScreen />
//       )}
//     </>
//   );
// }

// export default App;

// oldest code:
// {/* <GameCanvas gameOver={gameOver} setGameOver={setGameOver} /> : <EndScreen />} */}

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
