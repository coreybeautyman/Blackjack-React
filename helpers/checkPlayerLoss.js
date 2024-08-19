const checkPlayerLoss = (
  dealerCurrent,
  dealerLost,
  playerOneCurrent,
  playerOneLost,
  playerTwoCurrent,
  playerTwoLost,
  numberOfPlayers,
  playerOneHasCoins,
  playerTwoHasCoins
) => {
  if (
    dealerLost ||
    (numberOfPlayers === 1 && playerOneLost) ||
    (numberOfPlayers === 2 && playerOneLost && playerTwoLost)
  ) {
    return null;
  }

  if (dealerCurrent > 21) {
    return ['dealer'];
  }

  if (!playerOneLost && playerOneHasCoins) {
    if (
      playerOneCurrent > 21 ||
      (dealerCurrent > 16 &&
        dealerCurrent <= 21 &&
        dealerCurrent > playerOneCurrent)
    ) {
      return ['playerOne'];
    }
  }
  if (!playerTwoLost && numberOfPlayers === 2 && playerTwoHasCoins) {
    if (
      playerTwoCurrent > 21 ||
      (dealerCurrent > 16 &&
        dealerCurrent <= 21 &&
        dealerCurrent > playerTwoCurrent)
    ) {
      return ['playerTwo'];
    }
  }

  return null;
};
export default checkPlayerLoss;
