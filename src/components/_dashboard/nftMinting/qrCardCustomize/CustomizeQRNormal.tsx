import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import {
  changeOtherQRProps,
  changeOtherQRPropsAuthorRegister
} from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';
import { QRNormalOtherPropsPosTypes, QRNormalOtherPropsTypes } from './defautOtherQRProps';

const innerPointTypes = ['rect', 'round', 'rand'];
const anchorPointTypes = ['rect', 'round', 'planet'];
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

function CustomizeQRNormal() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: IRootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qrNormal,
        otherQRPropsAuthorRegister:
          state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qrNormal,
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );

  const dispatch = useDispatch();
  const changeProps = changeQRFile ? changeOtherQRProps : changeOtherQRPropsAuthorRegister;

  function handleSelectInnerPointType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrNormal: {
              type: innerPointTypes[value - 1] as QRNormalOtherPropsTypes
            }
          }
        })
      );
    }
  }

  function handleInnerPointSizeChange(event: any) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrNormal: {
            size: event.target.value
          }
        }
      })
    );
  }

  function handleInnerPointOpacityChange(event: any) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrNormal: {
            opacity:
              event.target.value > 100 ? 100 : event.target.value < 0 ? 0 : event.target.value
          }
        }
      })
    );
  }

  function handleInnerPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrNormal: {
            otherColor: value
          }
        }
      })
    );
  }

  function handleSelectAnchorPointType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeProps({
          otherQRProps: {
            qrNormal: {
              posType: anchorPointTypes[value - 1] as QRNormalOtherPropsPosTypes
            }
          }
        })
      );
    }
  }

  function handleAnchorPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeProps({
        otherQRProps: {
          qrNormal: {
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
          Inner point type
        </Typography>
        <Pagination
          count={innerPointTypes.length}
          page={
            changeQRFile
              ? innerPointTypes.indexOf(otherQRProps?.type as string) + 1
              : innerPointTypes.indexOf(otherQRPropsAuthorRegister?.type as string) + 1
          }
          color="primary"
          onChange={handleSelectInnerPointType}
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
          Inner point size
        </Typography>
        <TextField
          label="Number"
          type="number"
          value={
            changeQRFile
              ? (otherQRProps?.size as number)
              : (otherQRPropsAuthorRegister?.size as number)
          }
          onChange={handleInnerPointSizeChange}
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
          Inner point opacity
        </Typography>
        <TextField
          label="Percent Number"
          type="number"
          value={
            changeQRFile
              ? (otherQRProps?.opacity as number)
              : (otherQRPropsAuthorRegister?.opacity as number)
          }
          onChange={handleInnerPointOpacityChange}
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
          Inner Point Color
        </Typography>
        <ColorSinglePicker
          colors={colors}
          value={
            changeQRFile
              ? (otherQRProps?.otherColor as string)
              : (otherQRPropsAuthorRegister?.otherColor as string)
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
          count={anchorPointTypes.length}
          page={
            changeQRFile
              ? anchorPointTypes.indexOf(otherQRProps?.posType as string) + 1
              : anchorPointTypes.indexOf(otherQRPropsAuthorRegister?.posType as string) + 1
          }
          color="primary"
          onChange={handleSelectAnchorPointType}
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

export default CustomizeQRNormal;
