import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRMidIcon } from 'reduxStore/reducerCustomizeQRCard';
import ColorSinglePicker from '../ColorSinglePicker';

interface OtherProps {
  type: 'rect' | 'round' | 'rand';
  size: number;
  opacity: number;
  posType: 'rect' | 'round' | 'planet' | 'roundRect';
  otherColor: string;
  posColor: string;
}

const defaultOtherProps = {
  type: 'rect',
  size: 100,
  opacity: 100,
  posType: 'rect',
  otherColor: '#000000',
  posColor: '#000000'
};

const iconNames = ['switchswap', 'crust'];

function CustomizeQRNormal() {
  const icon = useSelector((state: IRootState) => {
    return state.qrCardReducer.icon;
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
    </>
  );
}

export default CustomizeQRNormal;
