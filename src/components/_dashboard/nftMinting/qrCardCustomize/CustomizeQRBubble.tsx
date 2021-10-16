import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
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

function CustomizeQRBubble() {
  const dispatch = useDispatch();

  function handleCircleColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrBubble: {
            circleColor: value
          }
        }
      })
    );
  }

  function handlePosColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrBubble: {
            posColor: value
          }
        }
      })
    );
  }

  return (
    <>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Anchor Point Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleCircleColorChange}
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
          Anchor Point Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handlePosColorChange}
        />
      </Box>
    </>
  );
}

export default CustomizeQRBubble;
