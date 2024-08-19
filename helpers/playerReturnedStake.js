const palyerReturnedStake = (coins, currentBet, inPlay) => {
  return inPlay ? coins : coins + currentBet;
};

export default palyerReturnedStake;
