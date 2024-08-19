export default function amountToImg(amount) {
  const newAmount = amount / 10;

  const cointStr = `coin-${newAmount}`;
  return cointStr;
}
