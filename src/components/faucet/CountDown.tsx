import { Typography } from '@mui/material';
import CountdownStyle from './CountDown.style';
import Separator from './Separator';

export default function CountDown({ timeLeftInSeconds }: { timeLeftInSeconds: number }) {
  const days = Math.floor(timeLeftInSeconds / (3600 * 24));
  const hours = Math.floor((timeLeftInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
  const seconds = Math.floor(timeLeftInSeconds % 60);

  return (
    <CountdownStyle>
      <div>
        <Typography variant="h3">{days}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
      </div>

      <Separator variant="h3">:</Separator>

      <div>
        <Typography variant="h3">{hours}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
      </div>

      <Separator variant="h3">:</Separator>

      <div>
        <Typography variant="h3">{minutes}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
      </div>

      <Separator variant="h3">:</Separator>

      <div>
        <Typography variant="h3">{seconds}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
      </div>
    </CountdownStyle>
  );
}
