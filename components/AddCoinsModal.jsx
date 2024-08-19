import { Button } from '@mui/material';
import PlayerSwitcher from './PlayerSwitcher';
import { useGame } from '../context/GameContext';
import CoinsInputAmount from './CoinsInputAmount';
import { useState } from 'react';

function AddCoinsModal() {
  const [playerSelected, setPlayerSelected] = useState(1);
  const [value, setValue] = useState(0);
  const { handleAddCoins, handleOpenCloseAddCoinsModal } = useGame();

  function handleAddClick() {
    handleAddCoins(playerSelected, +value);
    handleOpenCloseAddCoinsModal();
  }

  return (
    <div className='modal-overlay'>
      <div
        className='modal-background'
        onClick={handleOpenCloseAddCoinsModal}
      ></div>
      <div className='addCoinsModal'>
        <button
          onClick={handleOpenCloseAddCoinsModal}
          className='modal-close-Btn'
        >
          ❌
        </button>
        <div className='select-player-modal'></div>
        <div className='modal-title-div'>
          <h2 className='modal-title'>Add coins</h2>
        </div>
        <div className='modal-content-wrapper'>
          <div className='player-switcher-div middle-cont'>
            <PlayerSwitcher
              handleChange={handleAddCoins}
              displayOne={'Player 1'}
              displayTwo={'Player 2'}
              playerSelected={playerSelected}
              setPlayerSelected={setPlayerSelected}
            />
          </div>

          <CoinsInputAmount value={value} setValue={setValue} />
        </div>
        <div className='modal-btn-cont'>
          <Button
            onClick={handleAddClick}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              margin: 0,
              borderRadius: 0
            }}
            size={'large'}
            variant='contained'
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCoinsModal;
