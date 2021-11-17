import { Box, Pagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changeOtherQRProps, changeOtherQRPropsAuthorRegister } from 'redux/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

const funcTypes = ['A', 'B'];
const types = ['rect', 'round'];
const posTypes = ['rect', 'round', 'planet', 'roundRect'];
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

function CustomizeQRFunc() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: RootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qrFunc,
        otherQRPropsAuthorRegister:
          state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qrFunc,
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
            qrFunc: {
              funcType: funcTypes[value - 1]
            }
          }
        })
      );
    }
  }

  function handleSelectType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrFunc: {
              type: types[value - 1]
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
            qrFunc: {
              posType: posTypes[value - 1]
            }
          }
        })
      );
    }
  }

  function handleInnerPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
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
      changeProps({
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
      changeProps({
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
          Inner point type
        </Typography>
        <Pagination
          count={types.length}
          page={
            changeQRFile
              ? types.indexOf(otherQRProps?.type as string) + 1
              : types.indexOf(otherQRPropsAuthorRegister?.type as string) + 1
          }
          color="primary"
          onChange={handleSelectType}
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
          Inner Point Color 1
        </Typography>
        <ColorSinglePicker
          colors={colors}
          value={
            changeQRFile
              ? (otherQRProps?.otherColor1 as string)
              : (otherQRPropsAuthorRegister?.otherColor1 as string)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.otherColor2 as string)
              : (otherQRPropsAuthorRegister?.otherColor2 as string)
          }
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
          onChange={handleAnchorPointColorChange}
        />
      </Box>
    </>
  );
}

export default CustomizeQRFunc;
