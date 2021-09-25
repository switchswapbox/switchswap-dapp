import { useState } from 'react';
// material
import {
  Container,
  Paper,
  Box,
  SvgIcon,
  Grid,
  List,
  Switch,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  Avatar,
  ListItemSecondaryAction
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import { Icon } from '@iconify/react';
import SvgIconStyle from '../components/SvgIconStyle';
import iconOk from '../assets/icons/crust.svg';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { Block } from '../components/Block';
import MintingProcess from '../components/_dashboard/nftMinting/MintingProcess';
// ----------------------------------------------------------------------

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
              <ListWrapperStyle sx={{ mt: 3 }}>
                <List subheader={<ListSubheader>NFT Type</ListSubheader>}>
                  <ListItemButton>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="fxemoji:rocket" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText id="withAuthorReg" primary="With Author Registration" />
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
                  <ListItemButton>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="emojione:small-airplane" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText id="simplified" primary="Simplified" />
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
                  <ListItemButton>
                    <ListItemIcon>
                      <SvgIcon>
                        <Icon icon="emojione:bullet-train" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText id="withoutNftCard" primary="Without NFT Card" />
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
            <Block title="Requirements & Review">
              <Grid container>
                <Grid item xs={12} md={4}>
                  <ListWrapperStyle>
                    <List subheader={<ListSubheader>Requirements</ListSubheader>}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Box
                            component="img"
                            src="./static/icons/shared/metamask.svg"
                            sx={{ height: '24px' }}
                          />
                        </ListItemIcon>
                        <ListItemText id="blockchain" primary="Metamask" />
                      </ListItemButton>
                      <ListItemButton
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
                      </ListItemButton>
                    </List>
                  </ListWrapperStyle>
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
