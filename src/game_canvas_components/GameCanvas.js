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

  let score = 0;

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
      obstacleController.draw(context, canvas.width, canvas.height, score);

      targetController.targets.forEach((target) => {
        if (projectileController.collideWith(target)) {
          console.log("collision logged");
          score +=1;
          props.setScore(score);
        }
      });

      obstacleController.obstacles.forEach((obstacle) => {
        if (projectileController.collideWith(obstacle)) {
          console.log("hit a balloon")
        }
      })

      if (
        obstacleController.collideWith(bird)
      ) {
        console.log("Game Over.")
      }

      frameId = requestAnimationFrame(game);
    }

    requestAnimationFrame(game);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <canvas className="birdCanvas" width="1200" height="675" ref={canvasRef}>
        Bird Party Game!
      </canvas>
    </>
  );
}
