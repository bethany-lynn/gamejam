import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import useTargetController from "./custom_game_hooks/useTargetController";
import useObstacleController from "./custom_game_hooks/useObstacleController";

export default function GameCanvas(props) {
  const [gameStopped, setGameStopped] = useState(false);
  const [collisionWithObstacle, setCollisionWithObstacle] = useState(false);

  const canvasRef = useRef();

  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { TargetController } = useTargetController();
  let { ObstacleController } = useObstacleController({setCollisionWithObstacle});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameId;

    const targetController = new TargetController(canvas);
    const projectileController = new ProjectileController(canvas);
    const obstacleController = new ObstacleController(canvas);
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      projectileController.draw(context);
      bird.draw(context);

      targetController.draw(context, canvas.width, (8 * canvas.height) / 9);
      obstacleController.draw(context, canvas.width, canvas.height);

      targetController.targets.forEach((target) => {
        if (projectileController.collideWith(target)) {
          console.log("collision logged");
        }
      });

      if (
        obstacleController.collideWith(bird)
      ) {
        props.setGameOver(true);
        // setGameActive(false);
        console.log("bird collided with obstacle");
        console.log(`Game is stopped: ${gameStopped}`);
        // console.log(`state of the game:  ${gameOver}`);
      }

      frameId = requestAnimationFrame(game);
    }

    requestAnimationFrame(game);
    return () => cancelAnimationFrame(frameId);
  }, [Bird, ObstacleController, ProjectileController, TargetController, gameStopped]);

  return (
    <>
      <canvas className="birdCanvas" width="1200" height="675" ref={canvasRef}>
        Bird Party Game!
      </canvas>
    </>
  );
}