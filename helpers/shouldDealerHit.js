const shouldDealerHit = (
  dealerCurrent,
  dealerWon,
  dealerLost,
  playerOneWon,
  playerOneLost,
  playerOneDraw,
  playerTwoWon,
  playerTwoDraw,
  playerTwoLost,
  numberOfPlayers,
  activePlayer,
  playerOneHasCoins,
  playerTwoHasCoins
) => {
  if (activePlayer !== 3) return false;

  if (dealerWon || dealerLost || playerOneWon || playerTwoWon) return false;

  if (numberOfPlayers === 1) {
    if (playerOneDraw || playerOneLost || !playerOneHasCoins) return false;
    if (!playerOneLost && playerOneHasCoins) return true;
  }

  if (numberOfPlayers === 2) {
    if (!playerOneLost && !playerOneDraw && playerOneHasCoins) return true;
    if (!playerTwoLost && !playerTwoDraw && playerTwoHasCoins) return true;
  }

  if (dealerCurrent < 17) return true;

  if (dealerCurrent > 21) return false;
};

export default shouldDealerHit;
