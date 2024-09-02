import coinImages from '../helpers/coinImages';

function DisplayCoins({ amount }) {
  let arr = [];
  let newAmount = amount;
  let coinBlocks = Math.ceil(newAmount / 100);
  while (coinBlocks > 0) {
    const coinValue = newAmount > 100 ? 100 : newAmount;
    arr.push(coinImages[coinValue]);
    newAmount -= 100;
    coinBlocks--;
  }
  return arr.map((imgSrc, i) => (
    <img src={imgSrc} alt='coins' className={`${'coins-img'}`} key={i} />
  ));
}

export default DisplayCoins;
