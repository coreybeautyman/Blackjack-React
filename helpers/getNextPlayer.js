export default function getNextPlayer(
  numberOfPlayers,
  activePlayer,
  playerOne,
  playerTwo
) {
  if (!numberOfPlayers || !activePlayer) return;
  if (
    (playerOne.lost || playerOne.coins === 0 || playerOne.currentBet === 0) &&
    playerTwo.current > 21
  )
    return 0;
  if (numberOfPlayers === 1 && activePlayer === 1) return 3;
  if (numberOfPlayers === 1 && activePlayer === 3) return 3;
  if (numberOfPlayers === 2 && activePlayer === 2) return 3;
  if (numberOfPlayers === 2 && activePlayer === 3) return 3;
  if (
    numberOfPlayers === 2 &&
    activePlayer === 1 &&
    playerTwo.coins + playerTwo.currentBet === 0
  )
    return 3;

  if (numberOfPlayers === 2 && activePlayer === 1) return 2;
}
