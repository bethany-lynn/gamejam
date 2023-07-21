import './App.css';
import { useRef, useEffect } from 'react';

function App(props) {

  const canvasRef = useRef(null)

  function drawBird(ctx, xBird, yBird, birdWidth, birdHeight) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(xBird, yBird, birdWidth, birdHeight);
  }

  function drawObstacle(ctx) {
    let path = new Path2D('M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543 c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503 c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z');
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#00c48d';
    ctx.stroke(path);
    ctx.fill(path);
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const numRows = 3; // Number of rows (changed to 3)
    const rowHeight = canvas.height / 3; // Height of each row
    const shapeWidth = 50; // Width of the shape
    // let positionsX = []; // Array to store X positions for each row
    const brickOffsetTop = 30;
    // const speed = 7;

    let xBird = canvas.width / 6;
    let yBird = canvas.height / 2;

    let birdWidth = 40;
    let birdHeight = 40;
    let upPressed = false;
    let downPressed = false;
    let obstacleColumns = [];

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
      }
    }

    // window.onload = init;
    function init() {
      for (let i = 0; i < numRows; i++) {
        const interval = Math.random() * 2000 + 1000; // Random interval between 1000ms and 3000ms
        const speed = Math.random() * 2 + 3; // Random speed between 3 and 5
        obstacleColumns.push({ x: canvas.width + i * (rowHeight * Math.random()), interval, speed });
      }
    }


    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBird(context, xBird, yBird, birdWidth, birdHeight);

      if (upPressed) {
        yBird = Math.max(yBird - 13, 75);
      } else if (downPressed) {
        yBird = Math.min(yBird + 13, 600 - birdHeight);
      }

      for (let i = 0; i < numRows; i++) {
        const { x, interval, speed } = obstacleColumns[i];
        obstacleColumns[i].x -= speed;
        
        if (obstacleColumns[i].x + shapeWidth < 0) {
          obstacleColumns[i].x = canvas.width + rowHeight * Math.random();
          obstacleColumns[i].interval = Math.random() * 2000 + 1000; // Randomize the interval again
          obstacleColumns[i].speed = Math.random() * 2 + 3; // Randomize the speed again
        }
        
        context.save();
        context.translate(x, i * rowHeight + brickOffsetTop);
        drawObstacle(context);
        context.restore();
      }

      requestAnimationFrame(game)
    }


    init();
    game();

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