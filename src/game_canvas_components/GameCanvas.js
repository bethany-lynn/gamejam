import { useRef, useEffect, useState } from "react";
import useBird from "./custom_game_hooks/useBird";
import useProjectileController from "./custom_game_hooks/useProjectileController";
import useTargetController from "./custom_game_hooks/useTargetController";
import useObstacleController from "./custom_game_hooks/useObstacleController";

//parallax background
// import bgLayer1 from '../images/backtrees.png'
// import bgLayer2 from '../images/middletrees.png'
// import bgLayer3 from '../images/fronttrees.png'
// import bgLayer4 from '../images/sunlight.png'


export default function GameCanvas(props) {
  const [gameStopped, setGameStopped] = useState(false);
  const [collisionWithObstacle, setCollisionWithObstacle] = useState(false);

  const canvasRef = useRef();

  // parallax state storage
  // const [BgLayers, setBgLayers] = useState([]);
  // const [layerOffsets, setLayerOffsets] = useState(() => [0, 0, 0, 0]); // initial offsets

  // const updateLayerOffsets = (canvas) => {
  //   setLayerOffsets((prevOffsets) => {
  //     return prevOffsets.map((offset, index) => {
  //       const speedFactor = index + 1; // Adjust the speed factor as needed
  //       const maxOffset = BgLayers[index].width - canvas.width; // Adjust based on image and canvas dimensions
  //       let newOffset = offset - speedFactor;

  //       if (newOffset < -maxOffset) {
  //         // Reset offset if it goes beyond the maximum
  //         newOffset = 0;
  //       }

  //       return newOffset;
  //     });
  //   });
  // };


  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { TargetController } = useTargetController();
  let { ObstacleController } = useObstacleController({ setCollisionWithObstacle });

  let score = 0;


  // new useEffect for parallax
  // useEffect(() => {
  //   // Load layers/images when component mounts
  //   const loadParallaxBgLayers = () => {
  //     const imageSources = [bgLayer1, bgLayer2, bgLayer3, bgLayer4];
  //     const loadedLayers = [];

  //     const loadImage = (src) => {
  //       return new Promise((resolve, reject) => {
  //         const img = new Image();
  //         img.onload = () => resolve(img);
  //         img.onerror = (error) => reject(error);
  //         img.src = src;
  //       });
  //     };

  //     Promise.all(imageSources.map((src) => loadImage(src)))
  //       .then((images) => {
  //         // All images loaded successfully
  //         images.forEach((img) => {
  //           loadedLayers.push(img);
  //         });
  //         setBgLayers(loadedLayers);
  //       })
  //       .catch((error) => {
  //         console.error("Error loading parallax background layers:", error);
  //       });
  //   };

  //   loadParallaxBgLayers();
  // }, []);

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

      // // parallax
      // BgLayers.forEach((layer, index) => {
      //   context.drawImage(layer, layerOffsets[index], 0);
      // });
      // //


      projectileController.draw(context);
      bird.draw(context);

      targetController.draw(context, canvas.width, (8 * canvas.height) / 9);
      obstacleController.draw(context, canvas.width, canvas.height, score);

      targetController.targets.forEach((target) => {
        if (projectileController.collideWith(target)) {
          console.log("collision logged");
          score += 1;
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
        props.setGameOver(true);
        // setGameActive(false);
        console.log("bird collided with obstacle");
        console.log(`Game is stopped: ${gameStopped}`);
        // console.log(`state of the game:  ${gameOver}`);
        // console.log("Game Over.")
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