function DisplayCard({ card, player }) {
  const playerClass = `card player--card player01-card-1 player01-card`;
  const dealerClass = `card dealer--card`;

  const classlist = player === 'player' ? playerClass : dealerClass;

  return (
    <img
      src={`http://127.0.0.1:5500/cards/${card}.png`}
      alt='card'
      className={classlist}
    />
  );
}

export default DisplayCard;
