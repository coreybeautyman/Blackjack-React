import { useGame } from '../context/GameContext';
import AddCoinsModal from './AddCoinsModal';
import PlayerSwitcher from './PlayerSwitcher';
import StakeBox from './StakeBox';

function Controls() {
  const {
    numberOfPlayers,
    handleNumberOfPlayers,
    handleHit,
    handleStick,
    handleNewGame,
    handleOpenCloseAddCoinsModal,
    activePlayer,
    playerOne,
    playerTwo,
    addCoinsModalOpen
  } = useGame();

  const dealerActive = activePlayer === 3;

  return (
    <>
      <div className='middle'>
        <div className='middle-cont'>
          <div className='stakebox-cont'>
            <StakeBox player={playerOne} />
            <StakeBox player={playerTwo} />
          </div>

          <PlayerSwitcher
            playerSelected={numberOfPlayers}
            setPlayerSelected={handleNumberOfPlayers}
            displayOne={'1 Player'}
            displayTwo={'2 Player'}
          />
        </div>

        <div className='buttons'>
          <button
            disabled={dealerActive || activePlayer === 0}
            onClick={handleHit}
            className='btn btn--hit'
          >
            Hit
          </button>
          <button
            disabled={dealerActive || activePlayer === 0}
            onClick={handleStick}
            className='btn btn--stick'
          >
            Stick
          </button>
          <button onClick={handleNewGame} className='btn btn--new'>
            New game
          </button>
          <button
            onClick={handleOpenCloseAddCoinsModal}
            className='btn btn-add-coins'
          >
            Add coins
          </button>
        </div>
      </div>
      {addCoinsModalOpen === true && <AddCoinsModal />}
    </>
  );
}

export default Controls;
