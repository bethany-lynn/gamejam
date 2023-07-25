import "./App.css";
import { useRef, useEffect, useState } from "react";
import useBird from "./useBird";
import useProjectileController from "./useProjectileController";
import useTargetController from "./useTargetController";

function App(props) {
  // const { gameActive, setGameActive } = useState(true);
  const canvasRef = useRef();

  let { Bird } = useBird();
  let { ProjectileController } = useProjectileController();
  let { TargetController } = useTargetController();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const targetController = new TargetController(canvas);
    const projectileController = new ProjectileController(canvas);
    const bird = new Bird(
      canvas.width / 6,
      canvas.height / 2.1,
      projectileController
    );

    // function init() {
    //   for (let i = 0; i < numRows; i++) {
    //     const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
    //     const speed = Math.random() * 2 + 3;
    //     const color = getRandomColor();
    //     obstacleColumns.push({
    //       x: canvas.width + i * (rowHeight * Math.random()),
    //       interval,
    //       speed,
    //       color,
    //     });
    //   }
    // }

    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      projectileController.draw(context);
      bird.draw(context);

      targetController.draw(context, canvas.width, 8*canvas.height/9);

      

      requestAnimationFrame(game);
    }

    // init();
    requestAnimationFrame(game);
  }, [Bird, ProjectileController, TargetController]);

  return (
    <>
      {/* <h1>hello birdies</h1> */}
      <canvas
        className="birdCanvas"
        width="1200"
        height="675"
        ref={canvasRef}
        {...props}
      >
        Bird Party Game!
      </canvas>
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

// let xBird = canvas.width / 6;
// let yBird = canvas.height / 2;

// let xProjectile = xBird + 10;
// let yProjectile = yBird + 10;

// let birdWidth = 40;
// let birdHeight = 40;
// let upPressed = false;
// let downPressed = false;
// let projectileActive = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//   if (e.key === "Up" || e.key === "ArrowUp") {
//     upPressed = true;
//   } else if (e.key === "Down" || e.key === "ArrowDown") {
//     downPressed = true;
//   } else if (e.key === " " || e.code === "Space") {
//     if (projectileActive) { return } else {
//       projectileActive = true;
//       setTimeout(() => { console.log(projectileActive) }, 500)
//       setTimeout(() => { console.log(projectileActive) }, 1000)
//       setTimeout(() => {
//         projectileActive = false;
//         console.log(`projectileActive ${projectileActive}`);
//       }, 1500);
//     }
//   }
// }

// function keyUpHandler(e) {
//   if (e.key === "Up" || e.key === "ArrowUp") {
//     upPressed = false;
//   } else if (e.key === "Down" || e.key === "ArrowDown") {
//     downPressed = false;
//   }
// }

// drawBird(context, xBird, yBird);

// if (projectileActive) {
//   yProjectile += 8;
//   if (yProjectile > canvas.height) {
//     context.clearRect(0, canvas.height, canvas.width, canvas.height + 20)
//     projectileActive = false;
//     yProjectile = yBird
//   }
//   // context.save()
//   // context.translate(0, yProjectile)
//   drawProjectile(context, xProjectile, yProjectile, 20, 20);
//   // context.restore()
// }

// if (upPressed) {
//   yBird = Math.max(yBird - 13, 75);
// } else if (downPressed) {
//   yBird = Math.min(yBird + 13, 600 - birdHeight);
// }

// if (projectileActive) {
//   yProjectile += 8;
//   if (yProjectile > canvas.height) {
//     context.clearRect(0, canvas.height, canvas.width, canvas.height + 20);
//     projectileActive = false;
//     yProjectile = yBird;
//   }
//   // context.save()
//   // context.translate(0, yProjectile)
//   drawProjectile(context, xProjectile, yProjectile, 20, 20);
//   // context.restore()
// }
