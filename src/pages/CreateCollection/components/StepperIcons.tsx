import { CircularProgress } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import Iconify from 'components/Iconify';

const SuccessIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    fontSize: 24,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    }
  })
);

export function SuccessIcon(props: StepIconProps) {
  const { active, className } = props;
  return (
    <SuccessIconRoot ownerState={{ active }} className={className}>
      <Iconify icon="bi:check-circle" />
    </SuccessIconRoot>
  );
}

export function DoingIcon(props: StepIconProps) {
  const { active, className } = props;
  return (
    <SuccessIconRoot ownerState={{ active }} className={className}>
      <CircularProgress
        size={24}
        sx={{
          color: '#377dff'
        }}
      />
    </SuccessIconRoot>
  );
}

export function ErrorIcon(props: StepIconProps) {
  const { active, className } = props;
  return (
    <SuccessIconRoot ownerState={{ active }} className={className}>
      <Iconify icon="codicon:error" sx={{ color: '#FF4842' }} />
    </SuccessIconRoot>
  );
}
