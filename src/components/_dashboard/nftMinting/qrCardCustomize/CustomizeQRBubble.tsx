import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import {
  changeOtherQRPropsAuthorRegister,
  changeOtherQRProps
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

function CustomizeQRBubble() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: IRootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qrBubble,
        otherQRPropsAuthorRegister:
          state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qrBubble,
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );

  const dispatch = useDispatch();
  const changeProps = changeQRFile ? changeOtherQRProps : changeOtherQRPropsAuthorRegister;

  function handleCircleColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
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
      changeProps({
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
          value={
            changeQRFile
              ? (otherQRProps?.circleColor as string)
              : (otherQRPropsAuthorRegister?.circleColor as string)
          }
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
    </>
  );
}

export default CustomizeQRBubble;
