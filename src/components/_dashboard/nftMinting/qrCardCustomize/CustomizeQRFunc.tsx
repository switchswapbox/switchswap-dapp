import { Box, Pagination, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeOtherQRProps } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

const funcTypes = ['A', 'B'];
const types = ['rect', 'round'];
const posTypes = ['rect', 'round', 'planet', 'roundRect'];
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

function CustomizeQRFunc() {
  const dispatch = useDispatch();

  function handleSelectFuncType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
            funcType: funcTypes[value - 1]
          }
        }
      })
    );
  }

  function handleSelectType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
            type: types[value - 1]
          }
        }
      })
    );
  }

  function handleSelectPosType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
            posType: posTypes[value - 1]
          }
        }
      })
    );
  }

  function handleInnerPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
            otherColor1: value
          }
        }
      })
    );
  }

  function handleInterferencePointColorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
            otherColor2: value
          }
        }
      })
    );
  }

  function handleAnchorPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrFunc: {
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
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          pt: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Inference function
        </Typography>
        <Pagination count={funcTypes.length} color="primary" onChange={handleSelectFuncType} />
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
          Inner point type
        </Typography>
        <Pagination count={types.length} color="primary" onChange={handleSelectType} />
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
          Anchor point type
        </Typography>
        <Pagination count={posTypes.length} color="primary" onChange={handleSelectPosType} />
      </Box>

      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Inner Point Color 1
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleInnerPointColorChange}
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
          Inner Point Color 2
        </Typography>
        <ColorSinglePicker
          colors={colors}
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleInterferencePointColorChange}
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
          onChange={handleAnchorPointColorChange}
        />
      </Box>
    </>
  );
}

export default CustomizeQRFunc;
