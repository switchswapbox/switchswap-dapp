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

function CustomizeQRNormal() {
  const { innerPointSize, innerPointOpacity } = useSelector((state: IRootState) => {
    return {
      innerPointSize: state.qrCardReducer.otherQRProps.qrNormal.size,
      innerPointOpacity: state.qrCardReducer.otherQRProps.qrNormal.opacity
    };
  });
  const dispatch = useDispatch();

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

  function handleInnerPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
        otherQRProps: {
          qrNormal: {
            otherColor: value
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

  function handleAnchorPointColorChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    dispatch(
      changeOtherQRProps({
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
