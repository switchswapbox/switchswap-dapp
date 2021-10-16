import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRMidIcon } from 'reduxStore/reducerCustomizeQRCard';
const iconNames = ['switchswap', 'crust'];

function MidIconSelection() {
  const { icon } = useSelector((state: IRootState) => {
    return {
      icon: state.qrCardReducer.icon
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

export default MidIconSelection;
