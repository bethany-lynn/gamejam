import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import usePoofController from "./custom_game_hooks/usePoofController";
import useTargetController from "./custom_game_hooks/useTargetController";
import useObstacleController from "./custom_game_hooks/useObstacleController";
import useScore from "./custom_game_hooks/useScore";
import "./GameCanvas.css";

export default function GameCanvas(props) {
  const canvasRef = useRef();
  // const [score, setScore] = useState(0);

  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { PoofController } = usePoofController();
  let { TargetController } = useTargetController();
  let { ObstacleController } = useObstacleController();
  let { Score } = useScore();

  let scoreVar = 0;
  const scoreRef = useRef(0);

  useEffect(() => {
    ////////////////
    // Canvas & Animation variables
    ////////////////

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0; // assuming ~ 60 fps
    let birdLoopIndex = 0;
    let obstacleLoopIndex = 0; //aiming for 5 frames a cycle loop, 12 frames per second
    let foodLoopIndex = 0;
    let projectileLoopIndex = 0;
    let poofLoopIndex = 0;
    let render = true;

    ////////////////
    // Instantiate the things!
    ////////////////

    const targetController = new TargetController(canvas);
    const poofController = new PoofController(canvas);
    const projectileController = new ProjectileController(canvas);
    const obstacleController = new ObstacleController(canvas);
    const score = new Score();
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    ////////////////
    // Game Loop
    ////////////////

    function game() {
      ////////////////
      // managing variables for sprite animation loops
      ////////////////

      frameCount++;

      if (frameCount && frameCount % 12 === 0) {
        birdLoopIndex += 1;
        obstacleLoopIndex += 1;
        foodLoopIndex += 1;
        projectileLoopIndex += 1;
      }

      if (frameCount) {
        poofLoopIndex = frameCount;
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
      if (projectileLoopIndex > 2) {
        projectileLoopIndex = 1;
      }

      ////////////////
      // running draw methods to update canvas every frame
      ////////////////

      context.clearRect(0, 0, canvas.width, canvas.height);

      score.draw(context);

      projectileController.draw(context, projectileLoopIndex);

      bird.draw(context, birdLoopIndex);

      targetController.draw(
        context,
        canvas.width,
        (8 * canvas.height) / 9,
        foodLoopIndex
      );

      poofController.draw(context, poofLoopIndex);

      obstacleController.draw(
        context,
        canvas.width,
        canvas.height,
        scoreVar,
        obstacleLoopIndex
      );

      ////////////////
      // running collision methods to check each frame after draw
      ////////////////

      projectileController.projectiles.forEach((projectile) => {
        if (targetController.collideWith(projectile)) {
          poofController.spawn(projectile.x, projectile.y);
          scoreVar++;
          score.updateScore();
        }
      });

      obstacleController.obstacles.forEach((obstacle) => {
        if (projectileController.collideWith(obstacle)) {
        }
      });

      if (obstacleController.collideWith(bird)) {
        props.setGameOver(true);
        render = false;
      }

      // RAF to set frame rate
      if (render) {
        requestAnimationFrame(game);
      } else {
        cancelAnimationFrame(game);
      }
    }

    requestAnimationFrame(game);
  }, [Bird, ObstacleController, ProjectileController, TargetController]);

  return (
    <>
      <canvas className="birdCanvas" width="1200" height="675" ref={canvasRef}>
        Lil Bird Game!
      </canvas>
    </>
  );
}
