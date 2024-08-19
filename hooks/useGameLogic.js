import { useEffect, useMemo } from 'react';
import checkPlayerLoss from '../helpers/checkPlayerLoss';
import checkPlayerWon from '../helpers/checkPlayerWon';
import checkPlayerDraw from '../helpers/checkPlayerDraw';
import shouldDealerHit from '../helpers/shouldDealerHit';

export default function useGameLogic(state, dispatch, handleHit) {
  const { playerOne, playerTwo, activePlayer, dealer, numberOfPlayers } = state;

  const {
    current: playerOneCurrent,
    won: playerOneWon,
    lost: playerOneLost,
    draw: playerOneDraw,
    coins: playerOneCoins,
    currentBet: playerOneCurrentBet
  } = playerOne;
  const {
    current: playerTwoCurrent,
    won: playerTwoWon,
    lost: playerTwoLost,
    draw: playerTwoDraw,
    coins: playerTwoCoins,
    currentBet: playerTwoCurrentBet
  } = playerTwo;
  const { current: dealerCurrent, lost: dealerLost, won: dealerWon } = dealer;

  const playerOneHasCoins = playerOneCoins !== 0 || playerOneCurrentBet !== 0;
  const playerTwoHasCoins = playerTwoCoins !== 0 || playerTwoCurrentBet !== 0;

  const whoLost = useMemo(
    () =>
      checkPlayerLoss(
        dealerCurrent,
        dealerLost,
        playerOneCurrent,
        playerOneLost,
        playerTwoCurrent,
        playerTwoLost,
        numberOfPlayers,
        playerOneHasCoins,
        playerTwoHasCoins
      ),
    [
      dealerCurrent,
      dealerLost,
      playerOneCurrent,
      playerOneLost,
      playerTwoCurrent,
      playerTwoLost,
      numberOfPlayers,
      playerOneHasCoins,
      playerTwoHasCoins
    ]
  );

  const whoWon = useMemo(
    () =>
      checkPlayerWon(
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
      ),
    [
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
    ]
  );
  const whodrew = useMemo(
    () =>
      checkPlayerDraw(
        dealerCurrent,
        playerOneCurrent,
        playerOneDraw,
        playerTwoCurrent,
        playerTwoDraw,
        numberOfPlayers,
        playerOneHasCoins,
        playerTwoHasCoins
      ),
    [
      dealerCurrent,
      playerOneCurrent,
      playerOneDraw,
      playerTwoCurrent,
      playerTwoDraw,
      numberOfPlayers,
      playerOneHasCoins,
      playerTwoHasCoins
    ]
  );

  const dealerShouldHit = useMemo(
    () =>
      shouldDealerHit(
        dealerCurrent,
        dealerWon,
        dealerLost,
        playerOneWon,
        playerOneDraw,
        playerOneLost,
        playerTwoWon,
        playerTwoDraw,
        playerTwoLost,
        numberOfPlayers,
        activePlayer,
        playerOneHasCoins,
        playerTwoHasCoins
      ),
    [
      dealerCurrent,
      dealerWon,
      dealerLost,
      playerOneWon,
      playerOneDraw,
      playerOneLost,
      playerTwoWon,
      playerTwoDraw,
      playerTwoLost,
      numberOfPlayers,
      activePlayer,
      playerOneHasCoins,
      playerTwoHasCoins
    ]
  );

  useEffect(() => {
    if (whoLost)
      whoLost.forEach((str) => dispatch({ type: 'playerLost', payload: str }));

    if (whoWon)
      whoWon.forEach((str) => dispatch({ type: 'playerWon', payload: str }));

    if (whodrew)
      whodrew.forEach((str) => dispatch({ type: 'playerDraw', payload: str }));

    if (dealerShouldHit) {
      const hitTimeout = setTimeout(() => {
        handleHit();
      }, 1000);
      return () => clearTimeout(hitTimeout);
    }
  }, [whoLost, whoWon, whodrew, dealerShouldHit, dispatch, handleHit]);
}
