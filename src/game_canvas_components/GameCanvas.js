import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import useTargetController from "./custom_game_hooks/useTargetController";
import useObstacleController from "./custom_game_hooks/useObstacleController";
import './GameCanvas.css';

export default function GameCanvas(props) {
  // const [gameStopped, setGameStopped] = useState(false);
  // const [collisionWithObstacle, setCollisionWithObstacle] = useState(false);

  const canvasRef = useRef();
  
  const { Bird } = useBird();
  const { ProjectileController } = useProjectileController();
  const { TargetController } = useTargetController();
  const { ObstacleController } = useObstacleController(
    // {setCollisionWithObstacle,}
  );

  let score = 0;
  const updateAndRedraw = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0; // assuming ~ 60 fps
    let birdLoopIndex = 0;
    let obstacleLoopIndex = 0; //aiming for 5 frames a cycle loop, 12 frames per second
    let foodLoopIndex = 0;
    let projectileLoopIndex = 0;
    let render = true;

    const targetController = new TargetController(canvas);
    const projectileController = new ProjectileController(canvas);
    const obstacleController = new ObstacleController(canvas);
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    function debug(msg) {
          console.debug(msg, {
            bird: {
              x: bird.x,
              y: bird.y,
              widthX: bird.x + bird.width,
              heightY: bird.y + bird.height
            },
            obstacles: obstacleController.obstacles.map(
              ({x,y,width,height}) => ({x,y,width,height})
            )
          });
        }

    function game() {
      frameCount++;

      if (frameCount && frameCount % 12 === 0) {
        birdLoopIndex += 1;
        obstacleLoopIndex += 1;
        foodLoopIndex += 1;
        projectileLoopIndex += 1;
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

      if (updateAndRedraw.current) {
        console.count('update');
        debug('before');
        context.clearRect(0, 0, canvas.width, canvas.height);

        projectileController.draw(context, projectileLoopIndex);
        bird.draw(context, birdLoopIndex);

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
            score ++;

            // pseudo code:
            // splice target out of targetController.targets
            // get x and y value of target at that moment
            // draw a new useExplosion component that animates at that x & y but does not move left
            // animates through frame cycle loop (will have to play with timing)

            // setCollidedTarget(target); // Store the collided target
            // props.setScore(score);
          }
        });

        obstacleController.obstacles.forEach((obstacle) => {
          if (projectileController.collideWith(obstacle)) {
            console.log("hit a balloon");
          }
        });
        debug('after');
        updateAndRedraw.current = false;
      }

      if (obstacleController.collideWith(bird)) {
        props.setGameOver(true);
        render = false;
        console.log("bird collided with obstacle");
      }

      if (render) {requestAnimationFrame(game);}
    }

    requestAnimationFrame(game);
  }, [
    Bird,
    ObstacleController,
    ProjectileController,
    TargetController,
    // gameStopped,
  ]);

  return (
    <>
      <h2 className="score-box">{score}</h2>
      <canvas className="birdCanvas" width="1200" height="675" ref={canvasRef}>
        Bird Party Game!
      </canvas>
      <button onClick={() => updateAndRedraw.current = true} style={{marginTop: '-20px'}}>Advance</button>
    </>
  );
}
