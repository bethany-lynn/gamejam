import './App.css';
import { useRef, useEffect } from 'react';

// canvas.width = 903;
// canvas.height = 657;

// const background = new Image();
// background.src = "https://images.unsplash.com/photo-1516233758813-a38d024919c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80";

// background.onload = function(){
//     ctx.drawImage(background,0,0);   
// }

function App(props) {

    const canvasRef = useRef(null)

    function drawBird(ctx, xBird, yBird, birdWidth, birdHeight) {
        ctx.fillRect(xBird, yBird, birdWidth, birdHeight);
      }
    
      useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let frameCount = 0;
        let animationFrameId;
    
        let xBird = canvas.width / 6;
        let yBird = canvas.height / 2;
    
        let birdWidth = 40;
        let birdHeight = 40;
        let upPressed = false;
        let downPressed = false;
    
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
        function game() {
            context.clearRect(0,0, canvas.width, canvas.height);
    
            drawBird(context, xBird, yBird, birdWidth, birdHeight);
    
            if (upPressed) {
                yBird = Math.max(yBird - 13, 75);
            } else if (downPressed) {
                yBird = Math.min(yBird + 13, 600-birdHeight);
            }
    
            requestAnimationFrame(game)
        }
    
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
    