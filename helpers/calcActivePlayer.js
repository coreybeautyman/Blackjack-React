export default function calcActivePlayer(
  playerOneCoins,
  playerTwoCoins,
  action
) {
  if (action === 3) return 3;
  if (action === 2 && playerTwoCoins === 0) return 3;
  if (action === 2) return 2;
  if (playerOneCoins !== 0) return 1;
  if (playerTwoCoins !== 0) return 2;
  return 0;
}
