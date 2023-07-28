import GameCanvas from "../game_canvas_components/GameCanvas";
import Parallax from './Parallax';
import './GameWrapper.css';

export default function GameWrapper(props) {
    return (
        <div className="game-wrapper">
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