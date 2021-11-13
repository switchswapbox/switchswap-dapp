import { Paper, Typography } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector
} from '@mui/lab';

import { Block } from '../../Block';
import type { TimelineType } from './TimelineConfig';
import Scrollbar from 'components/Scrollbar';

export default function HomeTimeline({
  title,
  timelines
}: {
  title: string;
  timelines: TimelineType[];
}) {
  return (
    <Block
      title={title}
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        },
        p: { xs: 0, md: 2 }
      }}
    >
      <Scrollbar
        sx={{
          height: '500px',
          '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
        }}
      >
        <Timeline sx={{ pr: { xs: 0, md: 1 } }}>
          {timelines.map((item) => (
            <TimelineItem key={item.key}>
              <TimelineSeparator>
                <TimelineDot color={item.color}>{item.icon}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: 'grey.50012'
                  }}
                >
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {item.des}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.time}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Scrollbar>
    </Block>
  );
}
