import { useGame } from '../context/GameContext';

function Controls() {
  const {
    numberOfPlayers,
    handleNumberOfPlayers,
    handleHit,
    handleStick,
    handleNewGame,
    activePlayer
  } = useGame();

  const dealerActive = activePlayer === 3;
  return (
    <div className='middle'>
      <div className='middle-cont'>
        <div className='tabs'>
          <input
            checked={numberOfPlayers === 1}
            value='1'
            name='players'
            id='onePlayer'
            type='radio'
            className='input'
            onChange={handleNumberOfPlayers}
          ></input>
          <label htmlFor='onePlayer' className='label'>
            1 Player
          </label>
          <input
            checked={numberOfPlayers === 2}
            value='2'
            name='players'
            id='twoPlayers'
            type='radio'
            className='input'
            onChange={handleNumberOfPlayers}
          ></input>
          <label htmlFor='twoPlayers' className='label'>
            2 Players
          </label>
        </div>
      </div>

      <div className='winner-message win hidden'>
        <h1 className='winner-message-text'>Player X wins</h1>
      </div>
      <div className='buttons'>
        <button
          disabled={dealerActive}
          onClick={handleHit}
          className='btn btn--hit'
        >
          Hit
        </button>
        <button
          disabled={dealerActive}
          onClick={handleStick}
          className='btn btn--stick'
        >
          Stick
        </button>
        <button onClick={handleNewGame} className='btn btn--new'>
          New game
        </button>
      </div>
    </div>
  );
}

export default Controls;
