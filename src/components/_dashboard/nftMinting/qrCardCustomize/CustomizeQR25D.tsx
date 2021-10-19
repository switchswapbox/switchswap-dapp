import { Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeOtherQRProps } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

const colors = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];

function CustomizeQR25() {
  const { height, posHeight } = useSelector((state: IRootState) => {
    return {
      height: state.reducerCustomizeQRCard?.otherQRProps?.qr25D?.height,
      posHeight: state.reducerCustomizeQRCard?.otherQRProps?.qr25D?.posHeight
    };
  });
  const dispatch = useDispatch();

  function handleHeightChange(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qr25D: {
            height: event.target.value as number
          }
        }
      })
    );
  }

  function handlePosHeightChange(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qr25D: {
            posHeight: event.target.value
          }
        }
      })
    );
  }

  function handleSelectTopColor(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qr25D: {
            topColor: value
          }
        }
      })
    );
  }

  function handleSelectLeftColor(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qr25D: {
            leftColor: value
          }
        }
      })
    );
  }

  function handleSelectRightColor(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qr25D: {
            rightColor: value
          }
        }
      })
    );
  }

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          pt: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Column height
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={height as number}
          onChange={handleHeightChange}
          InputLabelProps={{
            shrink: true
          }}
          variant="standard"
        />
      </Box>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          pt: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Positioning point cylinder height
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={posHeight as number}
          onChange={handlePosHeightChange}
          InputLabelProps={{
            shrink: true
          }}
          variant="standard"
        />
      </Box>

      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Upper side Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleSelectTopColor}
        />
      </Box>

      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Left Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleSelectLeftColor}
        />
      </Box>

      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Right Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleSelectRightColor}
        />
      </Box>
    </>
  );
}

export default CustomizeQR25;
