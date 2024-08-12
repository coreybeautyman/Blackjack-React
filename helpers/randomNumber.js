export default function randomNumber(highestNum) {
  if (!highestNum) return console.error('input max number');
  const randomNum = Math.floor(Math.random() * highestNum) + 1;
  return randomNum;
}
