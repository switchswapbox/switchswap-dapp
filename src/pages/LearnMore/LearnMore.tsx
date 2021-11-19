import { Container, Typography, Box, Tooltip } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Faqs from './components/Faqs';

import { DappStructure, NftExchange, NftMinting, Others } from './components/FaqsConfig';

import { Icon } from '@iconify/react';
import { MIconButton } from '../../components/@material-extend';

import { TELEGRAM, TWITTER, DISCORD, MEDIUM } from '../../constants/COMMON_VARIABLES';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Discord',
    icon: <Icon icon="bi:discord" width={24} height={24} />,
    href: DISCORD
  },
  {
    name: 'Telegram',
    icon: <Icon icon="uim:telegram-alt" width={24} height={24} />,
    href: TELEGRAM
  },
  {
    name: 'Twitter',
    icon: <Icon icon="akar-icons:twitter-fill" width={24} height={24} />,
    href: TWITTER
  },
  {
    name: 'Medium',
    icon: <Icon icon="ant-design:medium-square-filled" width={24} height={24} />,
    href: MEDIUM
  }
];
export default function LearnMore() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Learn More">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
          Frequently asked questions
        </Typography>
        <Faqs FaqsList={DappStructure} title={'Overview & Dapp infrucstructure'} />
        <Faqs FaqsList={NftExchange} title={'NFT Exchange'} />
        <Faqs FaqsList={NftMinting} title={'NFT Minting'} />
        <Faqs FaqsList={Others} title={'Others'} />
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Has other questions?<br></br>Please send your questions to{' '}
          <strong>hi@swichswap.io</strong>
        </Typography>
        <Box sx={{ textAlign: 'center', '& > *': { mx: 1, my: 5 } }}>
          {SOCIALS.map((social) => (
            <Tooltip key={social.name} title={social.name}>
              <MIconButton onClick={() => window.open(social.href, '_blank')}>
                {social.icon}
              </MIconButton>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </Page>
  );
}
