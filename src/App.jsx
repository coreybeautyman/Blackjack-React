import { useEffect } from 'react';
import Controls from '../components/Controls';
import Dealer from '../components/Dealer';
import Player from '../components/Player';
import { GameProvider } from '../context/GameContext';
import { preloadCardImages } from '../helpers/cardImages';
import { preloadCoinImages } from '../helpers/coinImages';

function App() {
  useEffect(() => {
    preloadCardImages();
    preloadCoinImages();
  }, []);

  return (
    <GameProvider>
      <div className='app'>
        <h1 className='title'>Black Jack</h1>

        <Dealer />
        <div className='container'>
          <Player playerNumber={1} />
          <Controls />
          <Player playerNumber={2} />
        </div>
      </div>
    </GameProvider>
  );
}
export default App;
