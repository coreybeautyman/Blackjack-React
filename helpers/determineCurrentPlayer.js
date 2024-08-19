export default function determineCurrentPlayer(activePlayer) {
  if (activePlayer === 1) return 'playerOne';
  if (activePlayer === 2) return 'playerTwo';
  if (activePlayer === 3) return 'dealer';
}
