import { useGame } from '../context/GameContext';
import DisplayCoins from './DisplayCoins';

function StakeBox({ player }) {
  const { numberOfPlayers } = useGame();
  const { coins, currentBet, playerNumber } = player;

  const hasCoins = currentBet > 0;
  const playerNotActive = numberOfPlayers === 1 && playerNumber === 2;

  const outOfMoney = coins === 0 && currentBet === 0;

  return (
    <div
      className={`stakebox ${hasCoins ? 'has-coins' : ''} ${
        playerNotActive || outOfMoney ? 'inactive' : ''
      }`}
    >
      <div className={`stakebox-coins-div ${hasCoins ? 'has-coins' : ''}`}>
        <DisplayCoins amount={player.currentBet} />
      </div>
      <h2 className='stake-amount'>{player.currentBet}</h2>
    </div>
  );
}

export default StakeBox;
