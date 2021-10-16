import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeOtherQRProps } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

const funcTypes = ['A', 'B'];
const types = ['rect', 'round'];
const posTypes = ['rect', 'round', 'planet', 'roundRect'];
const directions = [
  'left-right',
  'up-down',
  'h-v',
  'loop',
  'topLeft-bottomRight',
  'topRight-bottomLeft',
  'cross'
];
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

function CustomizeQRLine() {
  const { lineWidth, lineOpacity } = useSelector((state: IRootState) => {
    return {
      lineWidth: state.qrCardReducer.otherQRProps.qrLine.lineWidth,
      lineOpacity: state.qrCardReducer.otherQRProps.qrLine.lineOpacity
    };
  });
  const dispatch = useDispatch();

  function handleSelectFuncType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrLine: {
            funcType: funcTypes[value - 1]
          }
        }
      })
    );
  }

  function handleSelectPosType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrLine: {
            posType: types[value - 1]
          }
        }
      })
    );
  }

  function handlePosColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrLine: {
            posColor: value
          }
        }
      })
    );
  }

  function handleSelectDirection(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrLine: {
            direction: directions[value - 1]
          }
        }
      })
    );
  }

  function handleLineWidth(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            lineWidth: event.target.value
          }
        }
      })
    );
  }

  function handleLineOpacity(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            lineOpacity: event.target.value
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

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          pt: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Connection direction
        </Typography>
        <Pagination count={directions.length} color="primary" onChange={handleSelectDirection} />
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
          Connection width
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={lineWidth as number}
          onChange={handleLineWidth}
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
          Connection opacity
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={lineOpacity as number}
          onChange={handleLineOpacity}
          InputLabelProps={{
            shrink: true
          }}
          variant="standard"
        />
      </Box>
    </>
  );
}

export default CustomizeQRLine;
