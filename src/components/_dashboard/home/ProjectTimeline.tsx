import { last, slice } from 'lodash';
import { Icon } from '@iconify/react';
// material
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Container, Typography } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent
} from '@mui/lab';
// routes
// components
import Page from '../../Page';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: JSX.Element;
};

const TIMELINES: TimelineType[] = [
  {
    key: 7,
    title: 'Swap NFT smart contract',
    des: '',
    time: 'December 2021',
    icon: <Icon icon="fluent:people-swap-20-regular" color="black" />
  },
  {
    key: 6,
    title: 'NFT Gallery',
    des: 'Release NFT Gallery',
    time: 'November 2021',
    color: 'primary',
    icon: <Icon icon="clarity:video-gallery-line" color="white" />
  },
  {
    key: 5,
    title: 'NFT Cards',
    des: 'Release graphic tool to design NFT cards',
    time: 'October 2021',
    color: 'secondary',
    icon: <Icon icon="bi:card-checklist" color="white" />
  },
  {
    key: 4,
    title: 'Minting NFT smart contract - Beta',
    des: 'Deployed on Polygon Network',
    time: 'October 2021',
    color: 'info',
    icon: <Icon icon="healthicons:miner-worker-outline" color="white" />
  },
  {
    key: 3,
    title: 'Initial release',
    des: '',
    time: 'September 2021',
    color: 'success',
    icon: <Icon icon="whh:launch" color="white" height={16} width={16} />
  },
  {
    key: 2,
    title: 'DCF Member',
    des: 'Joining Decentralized Cloud Foundation',
    time: 'April 2021',
    color: 'warning',
    icon: <Icon icon="ri:vip-crown-2-line" color="white" />
  },
  {
    key: 1,
    title: 'Team Founded',
    des: 'Concept Design; Technologies Validation',
    time: 'February 2021',
    color: 'error',
    icon: <Icon icon="fluent:people-team-16-regular" color="white" />
  }
];

// ----------------------------------------------------------------------

export default function ProjectTimeline() {
  const lastItem = last(TIMELINES)?.key;

  const reduceTimeLine = slice(TIMELINES, TIMELINES.length - 3);

  return (
    <Block title="Project Timeline">
      <Timeline position="alternate">
        {TIMELINES.map((item) => (
          <TimelineItem key={item.key}>
            <TimelineOppositeContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={item.color}>{item.icon}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: 'grey.50012'
                }}
              >
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.des}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Block>
  );
}
