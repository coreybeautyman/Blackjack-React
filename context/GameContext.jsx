import { createContext, useContext, useEffect, useReducer } from 'react';
import randomNumber from '../helpers/randomNumber';

const GameContext = createContext();

const initialState = {
  playerOne: {
    current: 0,
    total: 0,
    cardsInHand: ['0_1', '0_1'],
    won: false,
    lost: false
  },
  playerTwo: {
    current: 0,
    total: 0,
    cardsInHand: ['0_1', '0_1'],
    won: false,
    lost: false
  },
  dealer: {
    current: 0,
    cardsInHand: ['0_1', '0_1'],
    lost: false,
    won: false
  },
  activePlayer: 1,
  numberOfPlayers: 1,

  error: ''
};

function updatePlayerState(player, action, cardIndex = null) {
  const newCurrent = player.current + action.payload.value;
  let newCardsinHand = [...player.cardsInHand];

  if (cardIndex !== null) {
    newCardsinHand[cardIndex] = action.payload.card;
  } else {
    newCardsinHand.push(action.payload.card);
  }

  return {
    ...player,
    current: newCurrent,
    cardsInHand: newCardsinHand
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'newGame':
      return {
        ...state,
        playerOne: {
          ...state.playerOne,
          current: 0,
          cardsInHand: ['0_1', '0_1'],
          won: false,
          lost: false
        },
        playerTwo: {
          ...state.playerTwo,
          current: 0,
          cardsInHand: ['0_1', '0_1'],
          won: false,
          lost: false
        },
        dealer: {
          current: 0,
          cardsInHand: ['0_1', '0_1'],
          won: false,
          lost: false
        },
        activePlayer: 1
      };

    case 'addCard': {
      const { player, cardIndex } = action.payload;
      return {
        ...state,
        [player]: updatePlayerState(state[player], action, cardIndex)
      };
    }

    case 'playerOneTotal':
      return { ...state, playerOne: { playerOneTotal: action.payload } };

    case 'playerTwoTotal':
      return { ...state, playerTwo: { playerTwoTotal: action.payload } };

    case 'playerLost': {
      const { player, nextPlayer } = action.payload;

      return {
        ...state,
        [player]: { ...state[player], lost: true },
        activePlayer: nextPlayer
      };
    }

    case 'playerWon': {
      const player = action.payload;

      return {
        ...state,
        [player]: {
          ...state[player],
          won: true,
          total: state[player].total + 1
        },
        activePlayer: 0
      };
    }

    case 'stick': {
      return { ...state, activePlayer: action.payload };
    }

    case 'dealerHit':
      return { ...state, dealerCurrent: action.payload };
    case 'changeNumberOfPlayers':
      return { ...state, numberOfPlayers: action.payload };

    default:
      throw new Error('Unknown action');
  }
}

const GameProvider = ({ children }) => {
  const [
    { playerOne, playerTwo, dealer, error, activePlayer, numberOfPlayers },
    dispatch
  ] = useReducer(reducer, initialState);

  function handleNumberOfPlayers(e) {
    dispatch({ type: 'changeNumberOfPlayers', payload: +e.target.value });
  }

  function handleHit() {
    let cardValue = randomNumber(13);
    const cardSuit = randomNumber(4);
    const card = `${cardValue}_${cardSuit}`;
    if (cardValue > 10) cardValue = 10;

    let currentPlayer;

    if (+activePlayer === 1) currentPlayer = 'playerOne';
    if (+activePlayer === 2) currentPlayer = 'playerTwo';
    if (+activePlayer === 3) currentPlayer = 'dealer';

    let cardsArr;

    if (currentPlayer === 'playerOne') cardsArr = playerOne.cardsInHand;
    if (currentPlayer === 'playerTwo') cardsArr = playerTwo.cardsInHand;
    if (currentPlayer === 'dealer') cardsArr = dealer.cardsInHand;

    let cardIndex = null;

    let player;
    if (currentPlayer === 'playerOne') player = playerOne;
    if (currentPlayer === 'playerTwo') player = playerTwo;
    if (currentPlayer === 'dealer') player = dealer;

    if (player.current >= 21) return;

    if (cardsArr[0] === '0_1') cardIndex = 0;
    else if (cardsArr[1] === '0_1') cardIndex = 1;

    dispatch({
      type: 'addCard',
      payload: { value: cardValue, card, player: currentPlayer, cardIndex }
    });
  }

  function handleStick() {
    let nextPlayer;

    if (numberOfPlayers === 1 && activePlayer === 1) nextPlayer = 3;
    if (numberOfPlayers === 2 && activePlayer === 1) nextPlayer = 2;
    if (numberOfPlayers === 2 && activePlayer === 2) nextPlayer = 3;

    dispatch({ type: 'stick', payload: nextPlayer });
  }

  function handleNewGame() {
    dispatch({ type: 'newGame' });
  }

  useEffect(() => {
    const currentPlayer =
      +activePlayer === 1
        ? playerOne
        : +activePlayer === 2
        ? playerTwo
        : dealer;

    if (currentPlayer.lost) return;

    const currentPlayerScore = currentPlayer.current;

    const player =
      +activePlayer === 1
        ? 'playerOne'
        : +activePlayer === 2
        ? 'playerTwo'
        : 'dealer';

    if (numberOfPlayers === 1 && currentPlayer.current > 21)
      dispatch({ type: 'playerLost', payload: { player, nextPlayer: 0 } });

    if (numberOfPlayers === 2 && currentPlayer.current > 21) {
      if (+activePlayer === 2 && !playerOne.lost) {
        dispatch({ type: 'playerLost', payload: { player, nextPlayer: 3 } });
      } else {
        dispatch({ type: 'playerLost', payload: { player, nextPlayer: 0 } });
      }
    }

    if (currentPlayerScore > 21)
      dispatch({ type: 'playerLost', payload: { player } });

    if (!dealer.lost && dealer.current > playerOne.current)
      dispatch({ type: 'playerLost', payload: 'playerOne' });
    if (!dealer.lost && dealer.current > playerTwo.current)
      dispatch({ type: 'playerLost', payload: 'playerTwo' });
  }, [activePlayer, playerOne, playerTwo, dealer, numberOfPlayers]);

  useEffect(() => {
    if (activePlayer !== 3) return;

    const dealerShouldHit =
      dealer.current < 17 || dealer.current < playerOne.current;

    if (dealerShouldHit) {
      const hitTimeout = setTimeout(() => {
        handleHit();
      }, 1000);
      return () => clearTimeout(hitTimeout);
    } else {
      dispatch({ type: 'playerWon', payload: 'dealer' });
    }
  }, [dealer.current, activePlayer, playerOne.current, handleHit, dispatch]);

  useEffect(() => {
    if (numberOfPlayers === 1 && dealer.lost)
      return dispatch({ type: 'playerWon', payload: 'playerOne' });

    if (numberOfPlayers === 2) {
      if (playerOne.lost && dealer.lost)
        return dispatch({ type: 'playerWon', payload: 'playerTwo' });
      if (playerTwo.lost && dealer.lost)
        dispatch({ type: 'playerWon', payload: 'playerOne' });
      if (dealer.lost) {
        dispatch({ type: 'playerWon', payload: 'playerOne' });
        dispatch({ type: 'playerWon', payload: 'playerTwo' });
      }
    }
  }, [playerOne.lost, playerTwo.lost, dealer.lost, numberOfPlayers]);

  return (
    <GameContext.Provider
      value={{
        playerOne,
        playerTwo,
        dealer,
        error,
        activePlayer,
        numberOfPlayers,
        handleNumberOfPlayers,
        handleNewGame,
        handleHit,
        handleStick
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error('Game context was used outside game provider');
  return context;
}

export { GameProvider, useGame };
