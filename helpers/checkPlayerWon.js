const checkPlayerWon = (
  dealerWon,
  dealerLost,
  playerOneWon,
  playerOneDraw,
  playerOneLost,
  playerTwoWon,
  playerTwoDraw,
  playerTwoLost,
  numberOfPlayers,
  playerOneHasCoins,
  playerTwoHasCoins
) => {
  if (dealerWon || playerOneWon || playerTwoWon) return;

  if (numberOfPlayers === 1) {
    if (dealerLost) return ['playerOne'];
    if (playerOneLost) return ['dealer'];
  }

  if (numberOfPlayers === 2) {
    if (dealerLost) {
      if (playerOneDraw && !playerTwoLost && playerTwoHasCoins)
        return ['playerTwo'];
      if (playerTwoDraw && !playerOneLost && playerOneHasCoins)
        return ['playerOne'];

      if (
        !playerOneLost &&
        !playerTwoLost &&
        playerOneHasCoins &&
        playerTwoHasCoins
      )
        return ['playerOne', 'playerTwo'];

      if (!playerOneLost && playerOneHasCoins) return ['playerOne'];

      if (!playerTwoLost && playerTwoHasCoins) return ['playerTwo'];
    }
    if (playerOneLost && playerTwoLost) return ['dealer'];
  }
  return null;
};

export default checkPlayerWon;
