import amountToImg from '../helpers/amountToImg';

function DisplayCoins({ amount }) {
  let arr = [];
  let newAmount = amount;
  let coinBlocks = Math.ceil(newAmount / 100);
  while (coinBlocks > 0) {
    arr.push(amountToImg(newAmount > 100 ? 100 : newAmount));
    newAmount -= 100;
    coinBlocks--;
  }

  return arr.map((str, i) => (
    <img
      src={`assets/coins/${str}.png`}
      alt='coins'
      className={`${'coins-img'}`}
      key={i}
    />
  ));
}

export default DisplayCoins;
