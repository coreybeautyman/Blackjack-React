import coin00 from '../src/assets/coins/coin-0.png';
import coin01 from '../src/assets/coins/coin-1.png';
import coin02 from '../src/assets/coins/coin-2.png';
import coin03 from '../src/assets/coins/coin-3.png';
import coin04 from '../src/assets/coins/coin-4.png';
import coin05 from '../src/assets/coins/coin-5.png';
import coin06 from '../src/assets/coins/coin-6.png';
import coin07 from '../src/assets/coins/coin-7.png';
import coin08 from '../src/assets/coins/coin-8.png';
import coin09 from '../src/assets/coins/coin-9.png';
import coin10 from '../src/assets/coins/coin-10.png';

const coinImages = {
  100: coin10,
  90: coin09,
  80: coin08,
  70: coin07,
  60: coin06,
  50: coin05,
  40: coin04,
  30: coin03,
  20: coin02,
  10: coin01,
  0: coin00
};

export function preloadCoinImages() {
  Object.values(coinImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export default coinImages;
