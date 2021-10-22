import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeOtherQRProps } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';
import { QRDsjOtherPropsPosTypes } from './defautOtherQRProps';

const anchorPointTypes = ['rect', 'dsj'];

function CustomizeqrDsj() {
  const { scale, crossWidth, posWidth, posType } = useSelector((state: IRootState) => {
    return {
      scale: state.reducerCustomizeQRCard?.otherQRProps?.qrDsj?.scale,
      crossWidth: state.reducerCustomizeQRCard?.otherQRProps?.qrDsj?.crossWidth,
      posWidth: state.reducerCustomizeQRCard?.otherQRProps?.qrDsj?.posWidth,
      posType: state.reducerCustomizeQRCard?.otherQRProps?.qrDsj?.posType
    };
  });
  const dispatch = useDispatch();

  function handleScaleChange(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrDsj: {
            scale: event.target.value
          }
        }
      })
    );
  }

  function handleCrossWidthChange(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrDsj: {
            crossWidth: event.target.value
          }
        }
      })
    );
  }

  function handleSelectAnchorPointType(event: React.ChangeEvent<unknown>, value: number) {
    if (value) {
      dispatch(
        changeOtherQRProps({
          otherQRProps: {
            qrDsj: {
              posType: anchorPointTypes[value - 1] as QRDsjOtherPropsPosTypes
            }
          }
        })
      );
    }
  }

  function handlePosWidthChange(event: any) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrDsj: {
            posWidth: event.target.value
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
          Inner point size
        </Typography>
        <TextField
          label="Percent Number"
          type="number"
          value={scale as number}
          onChange={handleScaleChange}
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
          X width
        </Typography>
        <TextField
          label="Percent Number"
          type="number"
          value={crossWidth as number}
          onChange={handleCrossWidthChange}
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
          Anchor point type
        </Typography>
        <Pagination
          count={anchorPointTypes.length}
          color="primary"
          onChange={handleSelectAnchorPointType}
        />
      </Box>

      {posType === 'dsj' ? (
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            pt: 2
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Anchor point size
          </Typography>
          <TextField
            label="Percent Number"
            type="number"
            value={posWidth as number}
            onChange={handlePosWidthChange}
            InputLabelProps={{
              shrink: true
            }}
            variant="standard"
          />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default CustomizeqrDsj;
