import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SxProps } from '@mui/system';
import Scrollbar from 'components/Scrollbar';
import React from 'react';

const successColor = '#E9FCD4';
const infoColor = '#D0F2FF';

const useStyles = makeStyles({
  root: {
    '&.Mui-selected': {
      backgroundColor: successColor,
      '&:hover': {
        backgroundColor: successColor
      }
    },
    '&:hover': {
      backgroundColor: infoColor
    },
    '&:active': {
      backgroundColor: successColor
    }
  }
});

const SingleButton = (
  name: string | number,
  src: string,
  handleSelect: (name: string | number) => void,
  buttonDim: string
) => {
  const classes = useStyles();
  return (
    <ToggleButton
      key={name}
      value={name}
      onClick={() => handleSelect(name)}
      className={classes.root}
      sx={{ padding: '7px' }}
    >
      <Box
        component="img"
        src={src}
        sx={{
          minHeight: buttonDim,
          minWidth: buttonDim,
          maxHeight: buttonDim,
          maxWidth: buttonDim,
          borderRadius: '8px'
        }}
      />
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
  sx?: SxProps;
}

const ToggleButtonGroupScrollbar = ({
  label,
  value,
  nameArray,
  srcArray,
  handleSelect,
  buttonDim,
  sx
}: ToggleButtonGroupScrollbarProps) => {
  return (
    <>
      <Stack
        sx={{
          mb: 3,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pt: 2,
          width: '100%',
          overflow: 'hidden',
          ...sx
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {label}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Scrollbar>
            <ToggleButtonGroup value={value} exclusive>
              {nameArray.map((name, index) =>
                SingleButton(name, srcArray[index], handleSelect, buttonDim)
              )}
            </ToggleButtonGroup>
          </Scrollbar>
        </Box>
      </Stack>
    </>
  );
};

export default React.memo(ToggleButtonGroupScrollbar);
