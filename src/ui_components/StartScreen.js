import './StartScreen.css';

export default function StartScreen({ onStartGame }) {
    return (
        <div className='StartScreen'>
            <div className='game-description'>
                Lil Bird has flown into a human party in her forest, oh no!
                She needs to make it to her nest without running into
                their party stuff. 
                <br/>
                Help her navigate her way through the cluttered
                forest, so she can go home and sip some birdy tea!
            </div>
            <button onClick={onStartGame} id="button">Start Game</button>
        </div>
    );
}