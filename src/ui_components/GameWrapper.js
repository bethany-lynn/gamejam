import GameCanvas from "../game_canvas_components/GameCanvas";
import Parallax from './Parallax';
import './GameWrapper.css';

// Component to hold canvas and parallax background for proper styling

export default function GameWrapper(props) {
    return (
        <div className="game-wrapper">
            <h1>Help Little Bird clean up her forest!</h1>
            <h3>Use space bar to poop on their party snacks!</h3>
            <GameCanvas
                gameOver={props.gameOver}
                setGameOver={props.setGameOver}
                setCollisionWithObstacle={props.detectCollisionWithObstacle}
                setScore={props.setScore}
            />
            <Parallax />
        </div>
    );
}