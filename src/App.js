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

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        const rendering = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(rendering)
        }
        rendering()
        
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }

    }, [draw])

    return (
        <>
            <h1>hello birdies</h1>
            <canvas className="birdCanvas" ref={canvasRef}{...props}></canvas>
        </>
    )
}

export default App;