const INITIAL_STATE = {
  playerOne: {
    current: 0,
    total: 0,
    cardsInHand: ['0_1', '0_1'],
    aces: 0,
    won: false,
    draw: false,
    lost: false,
    coins: 100,
    currentBet: 0,
    playerNumber: 1
  },
  playerTwo: {
    current: 0,
    total: 0,
    cardsInHand: ['0_1', '0_1'],
    aces: 0,
    won: false,
    draw: false,
    lost: false,
    coins: 100,
    currentBet: 0,
    playerNumber: 2
  },
  dealer: {
    current: 0,
    cardsInHand: ['0_1', '0_1'],
    aces: 0,
    won: false,
    draw: false,
    lost: false,
    playerNumber: 3
  },
  activePlayer: 1,
  numberOfPlayers: 1,
  inPlay: false,
  addCoinsModalOpen: false,

  error: ''
};

export default INITIAL_STATE;
