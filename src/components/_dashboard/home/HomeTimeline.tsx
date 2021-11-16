import { Card, CardContent, CardHeader, Paper, Typography } from '@mui/material';
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

type OrderItemProps = {
  item: {
    key: number;
    title: string;
    time: Date | string | number;
    type: string;
  };
  isLast: boolean;
};

function OrderItem({ item, isLast }: OrderItemProps) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'darkgreen' && 'primary') ||
            (type === 'green' && 'success') ||
            (type === 'blue' && 'info') ||
            (type === 'yellow' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {time}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function HomeTimeline({
  title,
  timelines
}: {
  title: string;
  timelines: TimelineType[];
}) {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {timelines.map((item, index) => (
            <OrderItem key={item.key} item={item} isLast={index === timelines.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>

    // <Block
    //   title={title}
    //   sx={{
    //     '& .MuiTimelineItem-missingOppositeContent:before': {
    //       display: 'none'
    //     },
    //     p: { xs: 0, md: 2 }
    //   }}
    // >
    //   <Scrollbar
    //     sx={{
    //       height: '500px',
    //       '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
    //     }}
    //   >
    //     <Timeline sx={{ pr: { xs: 0, md: 1 } }}>
    //       {timelines.map((item) => (
    //         <TimelineItem key={item.key}>
    //           <TimelineSeparator>
    //             <TimelineDot variant="outlined" color={item.color}></TimelineDot>
    //             <TimelineConnector />
    //           </TimelineSeparator>
    //           <TimelineContent>
    //             <Paper
    //               sx={{
    //                 p: 1,
    //                 bgcolor: 'grey.50012'
    //               }}
    //             >
    //               <Typography variant="subtitle2">{item.title}</Typography>

    //               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //                 {item.time}
    //               </Typography>
    //             </Paper>
    //           </TimelineContent>
    //         </TimelineItem>
    //       ))}
    //     </Timeline>
    //   </Scrollbar>
    // </Block>
  );
}
