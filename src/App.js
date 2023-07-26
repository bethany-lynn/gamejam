import './App.css';
import { useRef, useEffect } from 'react';
import useBird from './useBird';
import useObstacle from './useObstacle';
import useProjectile from './useProjectile';

function App(props) {
  const canvasRef = useRef(null);

  let { drawBird } = useBird();
  let { drawObstacle } = useObstacle();
  let { drawProjectile } = useProjectile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const numRows = 7; // Number of rows (changed to 3)
    const rowHeight = canvas.height / numRows; // Height of each row
    const shapeWidth = 50; // Width of the shape
    const brickOffsetTop = 30;

    let xBird = canvas.width / 6;
    let yBird = canvas.height / 2;

    let xProjectile = xBird + 10;
    let yProjectile = yBird + 10;

    let birdHeight = 40;
    let upPressed = false;
    let downPressed = false;
    let projectileActive = false;
    let obstacleColumns = [];

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
      } else if (e.key === " " || e.code === "Space") {
        if (projectileActive) { return } else {
          projectileActive = true;
          setTimeout(() => { console.log(projectileActive) }, 500)
          setTimeout(() => { console.log(projectileActive) }, 1000)
          setTimeout(() => {
            projectileActive = false;
            console.log(`projectileActive ${projectileActive}`);
          }, 1500);
        }
      }
      if (e.key === " " || e.code === "Space") {
        if (projectileActive) {
          return;
        } else {
          projectileActive = true;
          setTimeout(() => {
            console.log(projectileActive);
          }, 500);
          setTimeout(() => {
            console.log(projectileActive);
          }, 1000);
          setTimeout(() => {
            projectileActive = false;
            console.log(`projectileActive ${projectileActive}`);
          }, 1500);
        }
      }
    }
  

    function keyUpHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
      }
    }

    function init() {
      for (let i = 0; i < numRows; i++) {
        const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
        const speed = Math.random() * 2 + 3;
        const color = getRandomColor();
        obstacleColumns.push({
          x: canvas.width + i * (rowHeight * Math.random()),
          interval,
          speed,
          color,
        });
      }
    }

    function getRandomColor() {
      const colors = [
        "#D9ED92",
        "#B5E48C",
        "#99D98C",
        "#76C893",
        "#52B69A",
        "#34A0A4",
        "#168AAD",
        "#1A759F",
        "#1E6091",
        "#184E77",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const obstacleScale = 2;
      drawBird(context, xBird, yBird);

      if (projectileActive) {
        yProjectile += 8;
        if (yProjectile > canvas.height) {
          context.clearRect(0, canvas.height, canvas.width, canvas.height + 20)
          projectileActive = false;
          yProjectile = yBird
        }
        drawProjectile(context, xProjectile, yProjectile, 20, 20);
      }

      if (upPressed) {
        yBird = Math.max(yBird - 13, 75);
      } else if (downPressed) {
        yBird = Math.min(yBird + 13, 600 - birdHeight);
      }

      if (projectileActive) {
        yProjectile += 8;
        if (yProjectile > canvas.height) {
          context.clearRect(0, canvas.height, canvas.width, canvas.height + 20);
          projectileActive = false;
          yProjectile = yBird;
        }
        drawProjectile(context, xProjectile, yProjectile, 20, 20);
      }

      for (let i = 0; i < numRows; i++) {
        const { x, speed } = obstacleColumns[i];
        obstacleColumns[i].x -= speed;

        if (obstacleColumns[i].x + shapeWidth < 0) { // when the shape is beyond the y axis
          obstacleColumns[i].x = canvas.width + rowHeight * Math.random();
          obstacleColumns[i].interval = Math.random() * 2000 + 1000; // Randomize the interval again
          obstacleColumns[i].speed = Math.random() * 2 + 3; // Randomize the speed again
          obstacleColumns[i].color = getRandomColor();
        }

        context.save();
        context.translate(x, i * rowHeight + brickOffsetTop);
        drawObstacle(context, obstacleColumns[i], obstacleScale);
        context.restore();
      }

      requestAnimationFrame(game);
    }

    init();
    requestAnimationFrame(game);
  }, [drawBird, drawObstacle, drawProjectile]);

  return (
    <>
      <h1>hello birdies</h1>
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
  // let birdWidth = 40;
  // let birdHeight = 40;

      // let frameCount = 0;
    // let animationFrameId;
        // const speed = 7;
            // let positionsX = []; // Array to store X positions for each row