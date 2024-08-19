import randomNumber from './randomNumber';

export default function randomCard() {
  let cardValue = randomNumber(13);
  const cardSuit = randomNumber(4);

  const card = `${cardValue}_${cardSuit}`;
  if (cardValue > 10) cardValue = 10;

  if (cardValue === 1) cardValue = 11;
  return [cardValue, card];
}
