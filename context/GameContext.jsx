import { createContext, useContext, useReducer } from 'react';
import randomCard from '../helpers/randomCard';
import determineCurrentPlayer from '../helpers/determineCurrentPlayer';
import getCardIndex from '../helpers/getCardIndex';
import getNextPlayer from '../helpers/getNextPlayer';
import useGameLogic from '../hooks/useGameLogic';
import updatePlayerState from '../helpers/updatePlayerState';
import INITIAL_STATE from '../config/initialState';
import palyerReturnedStake from '../helpers/playerReturnedStake';
import calcActivePlayer from '../helpers/calcActivePlayer';

const GameContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'newGame':
      return {
        ...INITIAL_STATE,
        playerOne: {
          ...INITIAL_STATE.playerOne,
          total: state.playerOne.total,
          coins: palyerReturnedStake(
            state.playerOne.coins,
            state.playerOne.currentBet,
            state.inPlay
          )
        },
        playerTwo: {
          ...INITIAL_STATE.playerTwo,
          total: state.playerTwo.total,
          coins: palyerReturnedStake(
            state.playerTwo.coins,
            state.playerTwo.currentBet,
            state.inPlay
          )
        },
        activePlayer: calcActivePlayer(
          state.playerOne.coins,
          state.playerTwo.coins,
          state.numberOfPlayers
        ),
        numberOfPlayers: state.numberOfPlayers
      };

    case 'addCard': {
      const { player, cardIndex } = action.payload;
      return {
        ...state,
        [player]: updatePlayerState(state[player], action, cardIndex),
        inPlay: true
      };
    }

    case 'playerLost': {
      const player = action.payload;
      let nextPlayer = getNextPlayer(
        state.numberOfPlayers,
        state.activePlayer,
        state.playerOne,
        state.playerTwo
      );
      const dealerLost = player === 'dealer';
      if (dealerLost) {
        return {
          ...state,
          ['dealer']: { ...state['dealer'], lost: true },
          activePlayer: 0
        };
      } else {
        return {
          ...state,
          [player]: { ...state[player], lost: true, currentBet: 0 },
          activePlayer: nextPlayer
        };
      }
    }

    case 'playerDraw': {
      const player = action.payload;

      return {
        ...state,
        [player]: {
          ...state[player],
          draw: true,
          coins: state[player].coins + state[player].currentBet,
          currentBet: 0
        },
        ['dealer']: {
          ...state['dealer'],
          draw: true
        }
      };
    }

    case 'playerWon': {
      const player = action.payload;
      const addToTotal = player === 'dealer' ? 0 : 1;
      const dealerWon = player === 'dealer';

      if (dealerWon) {
        return {
          ...state,
          [player]: {
            ...state[player],
            won: true,
            draw: false,
            total: state[player].total + addToTotal
          },
          ['playerOne']: {
            ...state['playerOne'],
            draw: false,
            won: false
          },
          ['playerTwo']: {
            ...state['playerTwo'],
            draw: false,
            won: false
          },
          activePlayer: 0
        };
      } else {
        return {
          ...state,
          [player]: {
            ...state[player],
            won: true,
            draw: false,
            total: state[player].total + addToTotal,
            coins: state[player].coins + state[player].currentBet * 2,
            currentBet: 0
          },
          activePlayer: 0
        };
      }
    }

    case 'stick': {
      return {
        ...state,
        activePlayer: action.payload
      };
    }

    case 'changeNumberOfPlayers':
      return {
        ...state,
        numberOfPlayers: action.payload,
        activePlayer: calcActivePlayer(
          state.playerOne.coins,
          state.playerTwo.coins,
          action.payload
        )
      };

    case 'addStake': {
      const player = action.payload;

      if (state[player].coins === 0) return { ...state };
      return {
        ...state,
        [player]: {
          ...state[player],
          coins: state[player].coins - 10,
          currentBet: state[player].currentBet + 10
        }
      };
    }
    case 'minusStake': {
      const player = action.payload;

      if (state[player].currentBet === 0) return { ...state };
      return {
        ...state,
        [player]: {
          ...state[player],
          coins: state[player].coins + 10,
          currentBet: state[player].currentBet - 10
        }
      };
    }
    case 'allIn': {
      const player = action.payload;
      return {
        ...state,
        [player]: {
          ...state[player],
          currentBet: state[player].currentBet + state[player].coins,
          coins: 0
        }
      };
    }
    case 'openCloseModal': {
      return {
        ...state,
        addCoinsModalOpen: !state.addCoinsModalOpen
      };
    }
    case 'addCoins': {
      const player = action.payload.player;
      return {
        ...state,
        [player]: {
          ...state[player],
          coins: state[player].coins + action.payload.amount
        },
        activePlayer: calcActivePlayer(
          state.playerOne.coins,
          state.playerTwo.coins,
          state.numberOfPlayers
        )
      };
    }

    default:
      console.error(action.type, action.payload);
  }
}

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    playerOne,
    playerTwo,
    dealer,
    error,
    activePlayer,
    numberOfPlayers,
    inPlay,
    addCoinsModalOpen
  } = state;

  useGameLogic(state, dispatch, handleHit);

  function handleNumberOfPlayers(playerNumber) {
    dispatch({ type: 'changeNumberOfPlayers', payload: playerNumber });
  }

  function handleHit() {
    let currentPlayer = determineCurrentPlayer(activePlayer);
    const [cardValue, card] = randomCard();

    let cardIndex = getCardIndex(state[currentPlayer].cardsInHand);

    dispatch({
      type: 'addCard',
      payload: { value: cardValue, card, player: currentPlayer, cardIndex }
    });
  }

  function handleStick() {
    let nextPlayer = getNextPlayer(
      numberOfPlayers,
      activePlayer,
      playerOne,
      playerTwo
    );
    dispatch({ type: 'stick', payload: nextPlayer });
  }

  function handleNewGame() {
    dispatch({ type: 'newGame' });
  }

  function handleStake(e, playerNumber) {
    const player = determineCurrentPlayer(playerNumber);
    const plusMinus = e.target.value === '+' ? 'addStake' : 'minusStake';

    dispatch({ type: plusMinus, payload: player });
  }

  function handleAllIn(playerNumber) {
    const player = determineCurrentPlayer(playerNumber);
    dispatch({ type: 'allIn', payload: player });
  }

  function handleOpenCloseAddCoinsModal() {
    dispatch({ type: 'openCloseModal' });
  }

  function handleAddCoins(playerNumber, amount) {
    const player = determineCurrentPlayer(playerNumber);
    dispatch({ type: 'addCoins', payload: { player, amount } });
  }

  return (
    <GameContext.Provider
      value={{
        playerOne,
        playerTwo,
        dealer,
        error,
        activePlayer,
        numberOfPlayers,
        inPlay,
        addCoinsModalOpen,
        handleNumberOfPlayers,
        handleNewGame,
        handleHit,
        handleStick,
        handleStake,
        handleAllIn,
        handleOpenCloseAddCoinsModal,
        handleAddCoins
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
