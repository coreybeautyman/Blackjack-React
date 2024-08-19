import { TextField } from '@mui/material';

function CoinsInputAmount({ value, setValue }) {
  const handleBlur = () => {
    const roundedValue = Math.round(value / 10) * 10;
    setValue(roundedValue);
  };

  return (
    <>
      <div className='amount-suggestions'>
        <button onClick={() => setValue(value + 10)} className='btn-addCoins'>
          10
          <img className='modal-add-img' src='assets/coins/btn-coin.png'></img>
        </button>
        <button onClick={() => setValue(value + 50)} className='btn-addCoins'>
          50
          <img className='modal-add-img' src='assets/coins/btn-coin.png'></img>
        </button>
        <button onClick={() => setValue(value + 100)} className='btn-addCoins'>
          100
          <img className='modal-add-img' src='assets/coins/btn-coin.png'></img>
        </button>
      </div>
      <div className='input-amount'></div>
      <TextField
        id='outlined-number'
        label='Amount'
        type='number'
        value={value}
        onChange={(e) => setValue(e.target.value > 0 ? e.target.value : 0)}
        onBlur={handleBlur}
        InputLabelProps={{
          shrink: true,
          style: { color: 'white' }
        }}
        InputProps={{
          style: { color: 'white' },
          inputProps: { step: 10 }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white'
            },
            '&:hover fieldset': {
              borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white'
            }
          }
        }}
      />
    </>
  );
}

export default CoinsInputAmount;
