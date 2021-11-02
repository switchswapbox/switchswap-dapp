import { useEffect } from 'react';
import {
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  SvgIcon,
  ListItem,
  Paper,
  IconButton,
  Tooltip,
  Zoom
} from '@mui/material';
import { Block } from 'components/Block';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { CRUST_WALLET_WIKI, METAMASK_SELECT_POLYGON_URL } from 'assets/COMMON_VARIABLES';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DemoNft from '../DemoNft';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { useState } from 'react';
import { changeMintingProcessState } from 'reduxStore/reducerMintingProcess';
import useLocales from '../../../../hooks/useLocales';

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`
}));

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

export default function StepConfigureNFT() {
  const stepOneNotDone = useSelector((state: IRootState) => {
    return state.reducerMintingProcess.stepOneNotDone as boolean;
  });
  const [toggle, setToggle] = useState(['simplified']);

  const dispatch = useDispatch();
  const { translate } = useLocales();

  useEffect(() => {
    dispatch(changeMintingProcessState({ nftType: 'simplified' }));
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = toggle.indexOf(value);

    if (currentIndex === -1) {
      dispatch(changeMintingProcessState({ nftType: value }));
      setToggle([value]);
    } else if (value === 'withAuthorReg') {
      dispatch(changeMintingProcessState({ nftType: 'simplified' }));
      setToggle(['simplified']);
    } else {
      dispatch(changeMintingProcessState({ nftType: 'simplified' }));
      setToggle(['simplified']);
    }
  };
  return (
    <Grid container spacing={3} sx={{ pt: 2 }}>
      <Grid item xs={12} md={4}>
        <Block title={translate(`nftMinting.config`)}>
          <ListWrapperStyle>
            <List subheader={<ListSubheader>{translate(`nftMinting.blockchain`)}</ListSubheader>}>
              <ListItemButton>
                <ListItemIcon>
                  <Box
                    component="img"
                    src="./static/icons/shared/polygon.svg"
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
            <List subheader={<ListSubheader>{translate(`nftMinting.NFT type`)}</ListSubheader>}>
              <ListItemButton onClick={handleToggle('withAuthorReg')} disabled={true}>
                <ListItemIcon>
                  <SvgIcon>
                    <Icon icon="fxemoji:rocket" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  id="withAuthorReg"
                  primary={translate(`nftMinting.author`)}
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
              <ListItemButton onClick={handleToggle('simplified')} disabled={!stepOneNotDone}>
                <ListItemIcon>
                  <SvgIcon>
                    <Icon icon="emojione:small-airplane" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  id="simplified"
                  primary={translate(`nftMinting.simplified`)}
                  sx={{ pr: 5 }}
                />
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
              <ListItemButton onClick={handleToggle('withoutNftCard')} disabled={!stepOneNotDone}>
                <ListItemIcon>
                  <SvgIcon>
                    <Icon icon="emojione:bullet-train" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  id="withoutNftCard"
                  primary={translate(`nftMinting.card`)}
                  sx={{ pr: 5 }}
                />
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
        <Block title={translate(`nftMinting.requirements and sample`)}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={4} spacing={3}>
              <ListWrapperStyle>
                <List
                  subheader={<ListSubheader>{translate(`nftMinting.requirements`)}</ListSubheader>}
                >
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="metamask"
                        href={METAMASK_SELECT_POLYGON_URL}
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
                <List subheader={<ListSubheader>{translate(`nftMinting.usage`)}</ListSubheader>}>
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
                    <ListItemText id="blockchain" primary={translate(`nftMinting.images`)} />
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
                    <ListItemText id="blockchain" primary={translate(`nftMinting.extensions`)} />
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
                    <ListItemText id="blockchain" primary={translate(`nftMinting.art`)} />
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
                    <ListItemText id="blockchain" primary={translate(`nftMinting.asset`)} />
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
    </Grid>
  );
}
