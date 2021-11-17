import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changeOtherQRProps, changeOtherQRPropsAuthorRegister } from 'redux/reducerCustomizeQRCard';
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
  '#000000',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];

function CustomizeQRLine() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: RootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qrLine,
        otherQRPropsAuthorRegister:
          state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qrLine,
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );

  const dispatch = useDispatch();
  const changeProps = changeQRFile ? changeOtherQRProps : changeOtherQRPropsAuthorRegister;

  function handleSelectFuncType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrLine: {
              funcType: funcTypes[value - 1]
            }
          }
        })
      );
    }
  }

  function handleSelectPosType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrLine: {
              posType: types[value - 1]
            }
          }
        })
      );
    }
  }

  function handlePosColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrLine: {
            posColor: value
          }
        }
      })
    );
  }

  function handleSelectDirection(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrLine: {
              direction: directions[value - 1]
            }
          }
        })
      );
    }
  }

  function handleLineWidth(event: any) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrLine: {
            lineWidth: event.target.value
          }
        }
      })
    );
  }

  function handleLineOpacity(event: any) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrLine: {
            lineOpacity: event.target.value
          }
        }
      })
    );
  }
  function handleLineColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrLine: {
            lineColor: value
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
        <Pagination
          count={funcTypes.length}
          page={
            changeQRFile
              ? funcTypes.indexOf(otherQRProps?.funcType as string) + 1
              : funcTypes.indexOf(otherQRPropsAuthorRegister?.funcType as string) + 1
          }
          color="primary"
          onChange={handleSelectFuncType}
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
          Anchor point type
        </Typography>
        <Pagination
          count={posTypes.length}
          page={
            changeQRFile
              ? posTypes.indexOf(otherQRProps?.posType as string) + 1
              : posTypes.indexOf(otherQRPropsAuthorRegister?.posType as string) + 1
          }
          color="primary"
          onChange={handleSelectPosType}
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
          value={
            changeQRFile
              ? (otherQRProps?.posColor as string)
              : (otherQRPropsAuthorRegister?.posColor as string)
          }
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
        <Pagination
          count={directions.length}
          page={
            changeQRFile
              ? directions.indexOf(otherQRProps?.direction as string) + 1
              : directions.indexOf(otherQRPropsAuthorRegister?.direction as string) + 1
          }
          siblingCount={0}
          color="primary"
          onChange={handleSelectDirection}
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
          Connection width
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={
            changeQRFile
              ? (otherQRProps?.lineWidth as number)
              : (otherQRPropsAuthorRegister?.lineWidth as number)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.lineOpacity as number)
              : (otherQRPropsAuthorRegister?.lineOpacity as number)
          }
          onChange={handleLineOpacity}
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
          Line Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          value={
            changeQRFile
              ? (otherQRProps?.lineColor as string)
              : (otherQRPropsAuthorRegister?.lineColor as string)
          }
          sx={{
            ...(colors.length > 5 && {
              maxWidth: 200,
              justifyContent: 'flex-end'
            })
          }}
          onChange={handleLineColorChange}
        />
      </Box>
    </>
  );
}

export default CustomizeQRLine;
