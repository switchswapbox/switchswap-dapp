// material
import { Container, Typography, Box, Tooltip } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Faqs from 'components/Faqs';
import { FaqsForm } from '../components/_external-pages/faqs';
import {
  DappStructure,
  NftExchange,
  NftMinting,
  Others
} from '../components/_external-pages/faqs/FaqsConfig';

import { Icon } from '@iconify/react';
import { MIconButton } from '../components/@material-extend';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { TELEGRAM, TWITTER, DISCORD, MEDIUM } from '../assets/COMMON_VARIABLES';
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
        <Faqs FaqsList={DappStructure} title={'Dapp infrucstructure'} />
        <Faqs FaqsList={NftExchange} title={'NFT Exchange'} />
        <Faqs FaqsList={NftMinting} title={'NFT Minting'} />
        <Faqs FaqsList={Others} title={'Others'} />
        <FaqsForm />
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
