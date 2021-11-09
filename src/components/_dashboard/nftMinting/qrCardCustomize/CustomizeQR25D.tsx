import { Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import {
  changeOtherQRProps,
  changeOtherQRPropsAuthorRegister
} from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

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

function CustomizeQR25() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: IRootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qr25D,
        otherQRPropsAuthorRegister: state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qr25D,
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );
  const dispatch = useDispatch();
  const changeProps = changeQRFile ? changeOtherQRProps : changeOtherQRPropsAuthorRegister;

  function handleHeightChange(event: any) {
    dispatch(
      changeProps({
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
      changeProps({
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
      changeProps({
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
      changeProps({
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
      changeProps({
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
          value={
            changeQRFile
              ? (otherQRProps?.height as number)
              : (otherQRPropsAuthorRegister?.height as number)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.posHeight as number)
              : (otherQRPropsAuthorRegister?.posHeight as number)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.topColor as string)
              : (otherQRPropsAuthorRegister?.topColor as string)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.leftColor as string)
              : (otherQRPropsAuthorRegister?.leftColor as string)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.rightColor as string)
              : (otherQRPropsAuthorRegister?.rightColor as string)
          }
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
