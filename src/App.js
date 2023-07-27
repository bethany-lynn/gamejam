import "./App.css";
import EndScreen from "./ui_components/EndScreen";
import GameWrapper from "./ui_components/GameWrapper";
import StartScreen from "./ui_components/StartScreen";
import React, { useState } from "react";

function App(props) {
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // access state value, current and updated

  // const detectCollisionWithObstacle = (collisionOccurred) => {
  //   if (collisionOccurred) {
  //     setGameOver(true);
  //   }
  // };

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
    <div className="app-wrapper">
      {gameStarted ? (
        <>
          <h1>hello birdies</h1>
          <h2>{score}</h2>
          {!gameOver ? (
            <GameWrapper
              gameOver={gameOver}
              setGameOver={setGameOver}
              // setCollisionWithObstacle={detectCollisionWithObstacle}
              setScore={setScore}
            />
          ) : (
            <EndScreen onRestartGame={() => handleRestartGame()} /> // passing oRG prop to EndScreen component - invokes handle when arrow function called
          )}
        </>
      ) : (
        <StartScreen onStartGame={handleStartGame} /> // handleStartGame function as prop for component and called when button clicked
      )}
    </div>
  );
}

export default App;
