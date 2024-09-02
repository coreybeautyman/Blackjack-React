import cardImages from './cardImages';

function DisplayCard({ card, player }) {
  const playerClass = `card player--card player01-card-1 player01-card`;
  const dealerClass = `card dealer--card`;

  const classlist = player === 'player' ? playerClass : dealerClass;

  return <img src={cardImages[card]} alt='card' className={classlist} />;
}

export default DisplayCard;
