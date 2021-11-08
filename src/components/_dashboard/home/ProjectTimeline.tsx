import { Icon } from '@iconify/react';

import { Paper, Typography, Grid } from '@mui/material';
import Scrollbar from '../../Scrollbar';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector
} from '@mui/lab';

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

const ROADMAP: TimelineType[] = [
  {
    key: 5,
    title: 'NFT as collateral',
    des: 'Allow users to borrow asset using their NFT',
    time: 'Q4 2022',
    color: 'secondary',
    icon: <Icon icon="bi:card-checklist" color="white" />
  },
  {
    key: 4,
    title: 'Minting other types of NFT',
    des: 'Allow users to mint mp3,mp4 files as NFT',
    time: 'Q3 2022',
    color: 'info',
    icon: <Icon icon="healthicons:miner-worker-outline" color="white" />
  },
  {
    key: 3,
    title: 'Crosschain bridge',
    des: 'Allow users to trade Nfts between different network',
    time: 'Q2 2022',
    color: 'success',
    icon: <Icon icon="whh:launch" color="white" height={16} width={16} />
  },
  {
    key: 2,
    title: 'NFT Market place and token',
    des: 'Switchswap release it own NFT market place and SWW token',
    time: 'Q1 2022',
    color: 'warning',
    icon: <Icon icon="ri:vip-crown-2-line" color="white" />
  },
  {
    key: 1,
    title: 'Release Switchswap Beta',
    des: 'Minting Nft with Images on Polygon network using Crust network Storage',
    time: 'Q4 2021',
    color: 'error',
    icon: <Icon icon="fluent:people-team-16-regular" color="white" />
  }
];
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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Scrollbar
          sx={{
            height: '50vh',
            '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
          }}
        >
          <Block
            title="Project Timeline"
            sx={{
              '& .MuiTimelineItem-missingOppositeContent:before': {
                display: 'none'
              },
              p: { xs: 0, sm: 3 }
            }}
          >
            <Timeline sx={{ pr: { xs: 0, sm: 2 } }}>
              {TIMELINES.map((item) => (
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
          </Block>
        </Scrollbar>
      </Grid>
      <Grid item xs={12} md={6}>
        <Scrollbar
          sx={{
            height: '50vh',
            '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
          }}
        >
          <Block
            title="Road map"
            sx={{
              '& .MuiTimelineItem-missingOppositeContent:before': {
                display: 'none'
              },
              p: { xs: 0, sm: 3 }
            }}
          >
            <Timeline sx={{ pr: { xs: 0, sm: 2 } }}>
              {ROADMAP.map((item) => (
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
          </Block>
        </Scrollbar>
      </Grid>
    </Grid>
  );
}
