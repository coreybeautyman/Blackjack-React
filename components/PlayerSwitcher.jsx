function PlayerSwitcher({
  displayOne,
  displayTwo,
  playerSelected,
  setPlayerSelected
}) {
  return (
    <div className='tabs'>
      <input
        checked={playerSelected === 1}
        value={1}
        name={displayOne}
        id={displayOne}
        type='radio'
        className='input'
        onChange={() => setPlayerSelected(1)}
      ></input>
      <label htmlFor={displayOne} className='label'>
        {displayOne}
      </label>
      <input
        checked={playerSelected === 2}
        value={2}
        name={displayTwo}
        id={displayTwo}
        type='radio'
        className='input'
        onChange={() => setPlayerSelected(2)}
      ></input>
      <label htmlFor={displayTwo} className='label'>
        {displayTwo}
      </label>
    </div>
  );
}

export default PlayerSwitcher;
