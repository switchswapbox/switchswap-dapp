import { useState } from 'react';
// material
import {
  Container,
  Paper,
  Box,
  SvgIcon,
  Grid,
  Tooltip,
  Zoom,
  IconButton,
  List,
  Switch,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ImageIcon from '@mui/icons-material/Image';

import { Icon } from '@iconify/react';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { Block } from '../components/Block';
import MintingProcess from '../components/_dashboard/nftMinting/MintingProcess';
import DemoNft from '../components/_dashboard/nftMinting/DemoNft';

import { CRUST_WALLET_WIKI, METAMASK_SELECT_MATIC_URL } from '../assets/COMMON_VARIABLES';
// ----------------------------------------------------------------------

const withAuthorRegNFT = [
  { name: 'With Author 1', image: './static/sample-nft/withAuthorReg/01.jpg' },
  { name: 'With Author 2', image: './static/sample-nft/withAuthorReg/02.jpg' },
  { name: 'With Author 3', image: './static/sample-nft/withAuthorReg/03.jpg' }
];
const simplifiedNFT = [
  { name: 'Simplified 1', image: './static/sample-nft/simplified/07.jpg' },
  { name: 'Simplified 3', image: './static/sample-nft/simplified/01.png' },
  { name: 'Simplified 2', image: './static/sample-nft/simplified/05.jpg' }
];

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`
}));

export default function NftMinting() {
  const { themeStretch } = useSettings();
  const [toggle, setToggle] = useState(['withAuthorReg']);

  const handleToggle = (value: string) => () => {
    const currentIndex = toggle.indexOf(value);

    if (currentIndex === -1) {
      setToggle([value]);
    } else if (value === 'withAuthorReg') {
      setToggle(['simplified']);
    } else {
      setToggle(['withAuthorReg']);
    }
  };

  return (
    <Page title="NFT Minting">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Block title="NFT Configuration">
              <ListWrapperStyle>
                <List subheader={<ListSubheader>Blockchain</ListSubheader>}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Box
                        component="img"
                        src="./static/icons/shared/matic.svg"
                        sx={{ height: '24px' }}
                      />
                    </ListItemIcon>
                    <ListItemText id="blockchain" primary="Polygon" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={true}
                        inputProps={{
                          'aria-labelledby': 'blockchain'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
              <ListWrapperStyle sx={{ mt: 2 }}>
                <List subheader={<ListSubheader>NFT Type</ListSubheader>}>
                  <ListItemButton onClick={handleToggle('withAuthorReg')}>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="fxemoji:rocket" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                      id="withAuthorReg"
                      primary="With Author Registration"
                      sx={{ pr: 5 }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('withAuthorReg')}
                        checked={toggle.indexOf('withAuthorReg') !== -1}
                        inputProps={{
                          'aria-labelledby': 'withAuthorReg'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                  <ListItemButton onClick={handleToggle('simplified')}>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="emojione:small-airplane" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText id="simplified" primary="Simplified" sx={{ pr: 5 }} />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('simplified')}
                        checked={toggle.indexOf('simplified') !== -1}
                        inputProps={{
                          'aria-labelledby': 'simplified'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                  <ListItemButton onClick={handleToggle('withoutNftCard')}>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="emojione:bullet-train" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText id="withoutNftCard" primary="Without NFT Card" sx={{ pr: 5 }} />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('withoutNftCard')}
                        checked={toggle.indexOf('withoutNftCard') !== -1}
                        inputProps={{
                          'aria-labelledby': 'withoutNftCard'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>
          <Grid item xs={12} md={8}>
            <Block title="Requirements & Sample NFT">
              <Grid container spacing={3}>
                <Grid item xs={12} xl={4} spacing={3}>
                  <ListWrapperStyle>
                    <List subheader={<ListSubheader>Requirements</ListSubheader>}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="metamask"
                            href={METAMASK_SELECT_MATIC_URL}
                            target="_blank"
                          >
                            <HelpOutlineIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <Box
                            component="img"
                            src="./static/icons/shared/metamask.svg"
                            sx={{ height: '24px' }}
                          />
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Metamask" />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            href={CRUST_WALLET_WIKI}
                            target="_blank"
                            edge="end"
                            aria-label="crustwallet"
                          >
                            <HelpOutlineIcon />
                          </IconButton>
                        }
                        sx={{
                          display: toggle.indexOf('withAuthorReg') !== -1 ? 'flex' : 'none'
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            component="img"
                            src="./static/icons/shared/crust.svg"
                            sx={{ height: '24px' }}
                          />
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Crust Wallet" />
                      </ListItem>
                    </List>
                  </ListWrapperStyle>

                  <ListWrapperStyle sx={{ mt: 2 }}>
                    <List subheader={<ListSubheader>Usage</ListSubheader>}>
                      <ListItem
                        sx={{
                          display: toggle.indexOf('withoutNftCard') !== -1 ? 'flex' : 'none'
                        }}
                      >
                        <ListItemIcon>
                          <Tooltip TransitionComponent={Zoom} title="File's type">
                            <ImageIcon />
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Only for image" />
                      </ListItem>
                      <ListItem
                        sx={{
                          display: toggle.indexOf('withoutNftCard') !== -1 ? 'none' : 'flex'
                        }}
                      >
                        <ListItemIcon>
                          <Tooltip TransitionComponent={Zoom} title="File's type">
                            <DescriptionIcon />
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="All file extensions" />
                      </ListItem>
                      <ListItem
                        sx={{
                          display: toggle.indexOf('withAuthorReg') !== -1 ? 'flex' : 'none'
                        }}
                      >
                        <ListItemIcon>
                          <Tooltip TransitionComponent={Zoom} title="Suggested uses">
                            <BookmarkAddedIcon />
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Art, Intellectual Property" />
                      </ListItem>
                      <ListItem
                        sx={{
                          display: toggle.indexOf('simplified') !== -1 ? 'flex' : 'none'
                        }}
                      >
                        <ListItemIcon>
                          <Tooltip TransitionComponent={Zoom} title="Suggested uses">
                            <BookmarkAddedIcon />
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Anonymous Asset" />
                      </ListItem>
                    </List>
                  </ListWrapperStyle>
                </Grid>
                <Grid item xs={12} xl={8}>
                  <Grid
                    sx={{
                      display: toggle.indexOf('withAuthorReg') !== -1 ? 'block' : 'none'
                    }}
                  >
                    <DemoNft NFT={withAuthorRegNFT} />
                  </Grid>

                  <Grid
                    sx={{
                      display: toggle.indexOf('simplified') !== -1 ? 'block' : 'none'
                    }}
                  >
                    <DemoNft NFT={simplifiedNFT} />
                  </Grid>
                </Grid>
              </Grid>
            </Block>
          </Grid>
          <Grid item xs={12}>
            <Block title="Generate NFT">
              <MintingProcess />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
