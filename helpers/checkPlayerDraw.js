const checkPlayerDraw = (
  dealerCurrent,
  playerOneCurrent,
  playerOneDraw,
  playerTwoCurrent,
  playerTwoDraw,
  numberOfPlayers,
  playerOneHasCoins,
  playerTwoHasCoins
) => {
  if (dealerCurrent <= 16 || dealerCurrent > 21) return null;

  if (numberOfPlayers === 1 && !playerOneDraw) {
    if (dealerCurrent === playerOneCurrent && playerOneHasCoins)
      return ['playerOne'];
  }

  if (numberOfPlayers === 2) {
    if (
      dealerCurrent === playerOneCurrent &&
      !playerOneDraw &&
      playerOneHasCoins
    ) {
      return ['playerOne'];
    }
    if (
      dealerCurrent === playerTwoCurrent &&
      !playerTwoDraw &&
      playerTwoHasCoins
    ) {
      return ['playerTwo'];
    }
  }
  return null;
};

export default checkPlayerDraw;
