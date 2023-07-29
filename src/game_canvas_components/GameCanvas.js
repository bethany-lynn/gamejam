import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import useTargetController from "./custom_game_hooks/useTargetController";
import useObstacleController from "./custom_game_hooks/useObstacleController";
import './GameCanvas.css';

export default function GameCanvas(props) {
  // const [gameStopped, setGameStopped] = useState(false);
  // const [collisionWithObstacle, setCollisionWithObstacle] = useState(false);
  const [collidedTarget, setCollidedTarget] = useState(null);

  const canvasRef = useRef();

  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { TargetController } = useTargetController();
  let { ObstacleController } = useObstacleController(
    // {setCollisionWithObstacle,}
  );

  let score = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0; // assuming ~ 60 fps
    let birdLoopIndex = 0;
    let obstacleLoopIndex = 0; //aiming for 5 frames a second loop, 12 frames per cycle
    let foodLoopIndex = 0;
    let render = true;

    const targetController = new TargetController(canvas);
    const projectileController = new ProjectileController(canvas);
    const obstacleController = new ObstacleController(canvas);
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    function game() {
      frameCount++;

      if (frameCount && frameCount % 12 === 0) {
        birdLoopIndex += 1;
        obstacleLoopIndex += 1;
        foodLoopIndex += 1;
      }
      if (birdLoopIndex > 2) {
        birdLoopIndex = 0;
      }
      if (obstacleLoopIndex > 4) {
        obstacleLoopIndex = 0;
      }  
      if (foodLoopIndex > 1) {
        foodLoopIndex = 0;
      }

      // console.log(`foodloopindex: ${foodLoopIndex}`)
      context.clearRect(0, 0, canvas.width, canvas.height);

      projectileController.draw(context);
      bird.draw(context, birdLoopIndex);

      // console.log(`cannas width: ${canvas.width}`)

      targetController.draw(
        context,
        canvas.width,
        ((8 * canvas.height) / 9),
        foodLoopIndex
      );

      obstacleController.draw(
        context,
        canvas.width,
        canvas.height,
        score,
        obstacleLoopIndex
      );

      targetController.targets.forEach((target) => {
        if (projectileController.collideWith(target)) {
          console.log("hit a target");
          score += 1;
          setCollidedTarget(target); // Store the collided target
          props.setScore(score);
        }
      });

      obstacleController.obstacles.forEach((obstacle) => {
        if (projectileController.collideWith(obstacle)) {
          console.log("hit a balloon");
        }
      });

      if (obstacleController.collideWith(bird)) {
        props.setGameOver(true);
        render = false;
        console.log("bird collided with obstacle");
        // console.log(`Game is stopped: ${gameStopped}`);
        // console.log(`state of the game:  ${gameOver}`);
        // console.log("Game Over.")
      }

      if (render) {requestAnimationFrame(game);}
    }

    requestAnimationFrame(game);
    // return () => cancelAnimationFrame(frameId);
  }, [
    Bird,
    ObstacleController,
    ProjectileController,
    TargetController,
    // gameStopped,
  ]);

    // Handle collision after the game loop is completed
    useEffect(() => {
      if (collidedTarget) {
        // Update the score and handle other actions
        props.setScore((score) => score + 1);
        // Perform any other actions based on the collision, e.g., removing the target
        // and handling game over conditions
  
        // Reset the collidedTarget state to null after processing the collision
        setCollidedTarget(null);
      }
    }, [collidedTarget]);

  return (
    <>
      <canvas className="birdCanvas" width="1200" height="675" ref={canvasRef}>
        Bird Party Game!
      </canvas>
    </>
  );
}
