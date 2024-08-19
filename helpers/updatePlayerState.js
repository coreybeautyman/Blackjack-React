export default function updatePlayerState(player, action, cardIndex = null) {
  let newCurrent = player.current + action.payload.value;

  let newAces = player.aces;

  let newCardsinHand = [...player.cardsInHand];

  if (action.payload.value === 11) {
    newAces++;
  }

  if (newCurrent > 21 && newAces > 0) {
    newCurrent -= 10;
    newAces--;
  }

  if (cardIndex !== null) {
    newCardsinHand[cardIndex] = action.payload.card;
  } else {
    newCardsinHand.push(action.payload.card);
  }

  return {
    ...player,
    current: newCurrent,
    cardsInHand: newCardsinHand,
    aces: newAces
  };
}
