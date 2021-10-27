import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import React from 'react';

const singleButton = (
  name: string | number,
  src: string,
  handleSelect: (name: string | number) => void,
  buttonDim: string
) => {
  return (
    <ToggleButton key={name} value={name} onClick={() => handleSelect(name)}>
      <Box component="img" src={src} sx={{ height: buttonDim, width: buttonDim }} />
    </ToggleButton>
  );
};

export type stringAndNumber = string | number;

interface ToggleButtonGroupScrollbarProps {
  label: string;
  value: any;
  nameArray: Array<stringAndNumber>;
  srcArray: Array<string>;
  handleSelect: (name: stringAndNumber) => void;
  buttonDim: string;
  groupWidth: string;
}

const ToggleButtonGroupScrollbar = ({
  label,
  value,
  nameArray,
  srcArray,
  handleSelect,
  buttonDim,
  groupWidth
}: ToggleButtonGroupScrollbarProps) => {
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
          {label}
        </Typography>
        <Box sx={{ width: groupWidth }}>
          <Scrollbar>
            <ToggleButtonGroup value={value} exclusive>
              {nameArray.map((name, index) =>
                singleButton(name, srcArray[index], handleSelect, buttonDim)
              )}
            </ToggleButtonGroup>
          </Scrollbar>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(ToggleButtonGroupScrollbar);
