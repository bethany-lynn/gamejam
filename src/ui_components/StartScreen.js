import './StartScreen.css';

export default function StartScreen({ onStartGame }) {
    return (
        <div className='StartScreen'>
            <button onClick={onStartGame} id="button">Start Game</button>
        </div>
    );
}