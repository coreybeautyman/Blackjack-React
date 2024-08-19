import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useGame } from '../context/GameContext';

export default function PlusMinusBtn({ playerNumber, disable }) {
  const { handleStake, inPlay } = useGame();

  const disabledBtn = disable || inPlay;

  return (
    <ButtonGroup
      sx={{
        marginTop: 'auto'
      }}
      fullWidth={true}
      variant='contained'
      aria-label='button group'
    >
      <Button
        onClick={(e) => handleStake(e, playerNumber)}
        value='-'
        disabled={disabledBtn}
      >
        -
      </Button>
      <Button
        onClick={(e) => handleStake(e, playerNumber)}
        value='+'
        disabled={disabledBtn}
      >
        +
      </Button>
    </ButtonGroup>
  );
}
