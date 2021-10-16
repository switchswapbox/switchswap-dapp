import {
  Box,
  Pagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeOtherQRProps, changeQRMidIcon } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

const iconNames = ['switchswap', 'crust'];
const innerPointTypes = ['rect', 'round', 'rand'];
const anchorPointTypes = ['rect', 'round', 'planet'];

function CustomizeQRNormal() {
  const { icon, innerPointSize, innerPointOpacity } = useSelector((state: IRootState) => {
    return {
      icon: state.qrCardReducer.icon,
      innerPointSize: state.qrCardReducer.otherQRProps.qrNormal.size,
      innerPointOpacity: state.qrCardReducer.otherQRProps.qrNormal.opacity
    };
  });
  const dispatch = useDispatch();
  function handleSelectMidIcon(iconName: string) {
    icon !== iconName
      ? dispatch(changeQRMidIcon({ icon: iconName }))
      : dispatch(changeQRMidIcon({ icon: '' }));
  }

  function singleButton(iconName: string) {
    return (
      <ToggleButton
        value={iconName}
        sx={{ minWidth: '56px' }}
        onClick={() => handleSelectMidIcon(iconName)}
      >
        <Box
          component="img"
          src={`./static/icons/shared/${iconName}.svg`}
          sx={{ height: '24px', width: '32px' }}
        />
      </ToggleButton>
    );
  }

  function handleSelectInnerPointType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            type: innerPointTypes[value - 1]
          }
        }
      })
    );
  }

  function handleInnerPointSizeChange(event: any) {
    dispatch(
      changeOtherQRProps({
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
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            opacity:
              event.target.value > 100 ? 100 : event.target.value < 0 ? 0 : event.target.value
          }
        }
      })
    );
  }

  function handleSelectAnchorPointType(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            posType: anchorPointTypes[value - 1]
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
          alignItems: 'center',
          pt: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Icon
        </Typography>
        <Box sx={{ width: '160px', justifyContent: 'flex-end' }}>
          <Scrollbar>
            <ToggleButtonGroup value={icon} exclusive>
              {iconNames.map((iconName) => singleButton(iconName))}
            </ToggleButtonGroup>
          </Scrollbar>
        </Box>
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
          count={innerPointTypes.length}
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
          value={innerPointSize as number}
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
          value={innerPointOpacity as number}
          onChange={handleInnerPointOpacityChange}
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
    </>
  );
}

export default CustomizeQRNormal;
