import { useGame } from '../context/GameContext';
import DisplayCard from './DisplayCard';

function Dealer() {
  const { activePlayer, dealer } = useGame();
  const dealerActive = +activePlayer === 3;

  const { current, cardsInHand, lost, won, draw } = dealer;

  return (
    <div className='dealer-cont'>
      <div
        className={`dealer ${dealerActive && 'player--active'} ${
          lost ? 'lose' : ''
        } ${won ? 'win' : ''} ${draw ? 'draw' : ''}`}
      >
        <div className='dealer-cards'>
          {cardsInHand.map((card, i) => {
            return <DisplayCard player={'dealer'} card={card} key={i} />;
          })}
        </div>
        <h1 className='dealer-total'>{current}</h1>
      </div>
    </div>
  );
}

export default Dealer;
