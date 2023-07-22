import "./App.css";
import { useRef, useEffect } from "react";
import useBird from "./useBird";

function App(props) {
  const canvasRef = useRef(null);

  let birdWidth = 40;
  let birdHeight = 40;

  let { drawBird } = useBird();

  function drawObstacle(ctx, obstacleData, scale) {

    let path = new Path2D('M5.23779 14.9023C3.95007 14.5651 3 13.3935 3 12C3 10.9133 3.57781 9.96153 4.44296 9.43519C4.77097 9.23564 5 8.88395 5 8.5C5 5.46243 7.46243 3 10.5 3C11.6319 3 12.684 3.34194 13.5585 3.92817C13.9304 4.17745 14.4138 4.20323 14.846 4.08641C15.0545 4.03006 15.2737 4 15.5 4C16.8807 4 18 5.11929 18 6.5C18 6.83774 18.1969 7.16713 18.5096 7.29468C19.9704 7.89045 21 9.32499 21 11C21 12.5603 20.1067 13.9119 18.8036 14.5713L18.1095 20.124C18.0469 20.6245 17.6215 21 17.1172 21H6.88278C6.37846 21 5.95306 20.6245 5.8905 20.124L5.23779 14.9023ZM7 8.5C7 9.68934 6.3092 10.6409 5.48246 11.1438C5.18886 11.3225 5 11.6401 5 12C5 12.5523 5.44772 13 6 13H17C18.1046 13 19 12.1046 19 11C19 10.1656 18.4885 9.44599 17.7544 9.14658C16.5999 8.67575 16 7.55001 16 6.5C16 6.22386 15.7761 6 15.5 6C15.4516 6 15.4078 6.00634 15.3679 6.01712C14.5571 6.23627 13.4331 6.25185 12.4449 5.58946C11.8895 5.21715 11.2231 5 10.5 5C8.567 5 7 6.567 7 8.5ZM7.26556 15L7.76556 19H9V15H7.26556ZM13 19V15H11V19H13ZM15 19H16.2344L16.7344 15H15V19Z');
    ctx.save();
    ctx.scale(scale, scale); // changing cupcake size
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = obstacleData.color;
    ctx.stroke(path);
    ctx.fill(path);
    ctx.restore(); // original state
    
  }

  function drawProjectile(
    ctx,
    xProjectile,
    yProjectile,
    projectileWidth,
    projectileHeight
  ) {
    if (!(ctx instanceof CanvasRenderingContext2D)) {
      console.error("Invalid context");
      return;
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(xProjectile, yProjectile, projectileWidth, projectileHeight);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const numRows = 5; // Number of rows (changed to 3)
    const rowHeight = canvas.height / 5; // Height of each row
    const shapeWidth = 50; // Width of the shape
    // let positionsX = []; // Array to store X positions for each row
    const brickOffsetTop = 30;
    // const speed = 7;

    let xBird = canvas.width / 6;
    let yBird = canvas.height / 2;

    let xProjectile = xBird + 10;
    let yProjectile = yBird + 10;

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
      // Array of 10 colors to choose from
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
      // Randomly select a color from the colors array
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
        // context.save()
        // context.translate(0, yProjectile)
        drawProjectile(context, xProjectile, yProjectile, 20, 20);
        // context.restore()
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
        // context.save()
        // context.translate(0, yProjectile)
        drawProjectile(context, xProjectile, yProjectile, 20, 20);
        // context.restore()
      }

      for (let i = 0; i < numRows; i++) {
        const { x, speed } = obstacleColumns[i];
        obstacleColumns[i].x -= speed;

        if (obstacleColumns[i].x + shapeWidth < 0) {
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
  }, []);

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
