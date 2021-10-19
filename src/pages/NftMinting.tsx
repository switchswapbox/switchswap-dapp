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

export default function NftMinting() {
  const { themeStretch } = useSettings();

  return (
    <Page title="NFT Minting">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
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
