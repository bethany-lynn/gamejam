import './Parallax.css';

export default function Parallax() {
    return (
        <div className='parallax-wrapper'>
            <div className='forest' id='backtrees'></div>
            <div className='forest' id='sunlight'></div>
            <div className='forest' id='middletrees'></div>
            <div className='forest' id='fronttrees'></div>
        </div>
    );
}