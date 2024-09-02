const getPlayerAferCoins = (player) => {
  if (player === 'playerOne') return 1;
  if (player === 'playerTwo') return 2;
  return 0;
};

export default getPlayerAferCoins;
