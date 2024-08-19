import { useGame } from '../context/GameContext';
import DisplayCard from './DisplayCard';
import DisplayCoins from './DisplayCoins';
import PlusMinusBtn from './PlusMinusBtn';

function Player({ playerNumber }) {
  const {
    activePlayer,
    playerOne,
    playerTwo,
    numberOfPlayers,
    handleAllIn,
    inPlay
  } = useGame();
  const player = playerNumber === 1 ? playerOne : playerTwo;
  const currentPlayerActive = activePlayer === playerNumber;
  const { current, total, cardsInHand, coins, currentBet } = player;
  const playerNotActive = numberOfPlayers === 1 && playerNumber === 2;
  const outOfMoney = coins === 0 && currentBet === 0;
  const disable = outOfMoney || playerNotActive;

  return (
    <div
      className={`player ${currentPlayerActive ? 'player--active' : ''} ${
        player.lost ? 'lose' : ''
      } ${player.won ? 'win' : ''} ${player.draw ? 'draw' : ''} ${
        disable || outOfMoney ? 'inactive' : ''
      }`}
    >
      <div className='player-text'>
        <h2 className='name'>Player {playerNumber}</h2>
        <div className='player-score-cont'>
          <div className='total-div'>
            <p className='total-label'>Total</p>
            <p className='total-score'>{total}</p>
          </div>
          <div className='current-div'>
            <p className='current-label'>Current</p>
            <p className='current-score'>{current}</p>
          </div>
        </div>
      </div>

      <div className='cards'>
        {cardsInHand.map((card, i) => {
          return <DisplayCard player={'player'} card={card} key={i} />;
        })}
      </div>
      <div className='coins-cont player-text'>
        <div className='coins-div'>
          <p className='coins-label'>Coins</p>
          <p className='coins-amount'>{coins}</p>
          <div>
            {coins !== 0 ? (
              <DisplayCoins amount={coins} />
            ) : (
              <h3 className='add-more-coins'>Add more coins</h3>
            )}
          </div>
          <button
            disabled={disable || inPlay}
            onClick={() => handleAllIn(playerNumber)}
            className='btn btn-all-in'
          >
            ALL IN
          </button>
        </div>
      </div>

      <PlusMinusBtn disable={disable} playerNumber={playerNumber} />
    </div>
  );
}

export default Player;
