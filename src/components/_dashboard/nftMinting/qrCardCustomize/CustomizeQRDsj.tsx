import { Box, Pagination, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changeOtherQRPropsAuthorRegister, changeOtherQRProps } from 'redux/reducerCustomizeQRCard';
import { QRDsjOtherPropsPosTypes } from './defautOtherQRProps';

const anchorPointTypes = ['rect', 'dsj'];

function CustomizeqrDsj() {
  const { otherQRProps, otherQRPropsAuthorRegister, changeQRFile } = useSelector(
    (state: RootState) => {
      return {
        otherQRProps: state.reducerCustomizeQRCard?.otherQRProps?.qrDsj,
        otherQRPropsAuthorRegister: state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister?.qrDsj,
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );
  const dispatch = useDispatch();
  const changeProps = changeQRFile ? changeOtherQRProps : changeOtherQRPropsAuthorRegister;

  function handleScaleChange(event: any) {
    dispatch(
      changeProps({
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
      changeProps({
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
        changeProps({
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
      changeProps({
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
          value={
            changeQRFile
              ? (otherQRProps?.scale as number)
              : (otherQRPropsAuthorRegister?.scale as number)
          }
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
          value={
            changeQRFile
              ? (otherQRProps?.crossWidth as number)
              : (otherQRPropsAuthorRegister?.crossWidth as number)
          }
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
          page={
            changeQRFile
              ? anchorPointTypes.indexOf(otherQRProps?.posType as string) + 1
              : anchorPointTypes.indexOf(otherQRPropsAuthorRegister?.posType as string) + 1
          }
          color="primary"
          onChange={handleSelectAnchorPointType}
        />
      </Box>

      {changeQRFile && otherQRProps?.posType === 'dsj' ? (
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
            value={otherQRProps?.posWidth as number}
            onChange={handlePosWidthChange}
            InputLabelProps={{
              shrink: true
            }}
            variant="standard"
          />
        </Box>
      ) : !changeQRFile && otherQRPropsAuthorRegister?.posType === 'dsj' ? (
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
            value={otherQRPropsAuthorRegister?.posWidth as number}
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
