import { useGame } from '../context/GameContext';
import DisplayCard from './DisplayCard';

function Player({ playerNumber }) {
  const { activePlayer, playerOne, playerTwo } = useGame();

  const player = playerNumber === 1 ? playerOne : playerTwo;

  const currentPlayerActive = activePlayer === playerNumber;

  const { current, total, cardsInHand } = player;

  return (
    <div
      className={`player ${currentPlayerActive && 'player--active'} ${
        player.lost && 'lose'
      } ${player.won && 'win'}`}
    >
      <div className='player-text'>
        <h2 className='name'>Player {playerNumber}</h2>
        <div className='player-score-cont'>
          <div className='total-div'>
            <p className='total-label'>Total</p>
            <p className='total-score player1-total-score'>{total}</p>
          </div>
          <div className='current-div'>
            <p className='current-label'>Current</p>
            <p className='current-score player01-current-score' id='current--1'>
              {current}
            </p>
          </div>
        </div>
      </div>

      <div className='cards player01--cards'>
        {cardsInHand.map((card, i) => {
          return <DisplayCard player={'player'} card={card} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Player;
