export default function getCurrentPlayerStr(activePlayer) {
  return activePlayer === 1
    ? 'playerOne'
    : activePlayer === 2
    ? 'playerTwo'
    : 'dealer';
}
