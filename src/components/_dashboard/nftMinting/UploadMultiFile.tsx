import { useState } from 'react';
import { isString } from 'lodash';
import { Icon } from '@iconify/react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import fileFill from '@iconify/icons-eva/file-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';
// material
import { alpha, Theme, styled } from '@mui/material/styles';
import {
  Box,
  Fab,
  List,
  Grid,
  Tooltip,
  Zoom,
  Divider,
  Stack,
  Paper,
  ButtonBase,
  Button,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
  ListItem,
  Typography,
  ListItemIcon,
  LinearProgress,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AlarmIcon from '@mui/icons-material/Alarm';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Scrollbar from '../../Scrollbar';
import CheckIcon from '@mui/icons-material/Check';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import { SxProps } from '@mui/system';

// utils
import { fData } from '../../../utils/formatNumber';
//
import { MIconButton } from '../../@material-extend';
import { varFadeInRight } from '../../animate';
import { UploadIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadMultiFileProps extends DropzoneOptions {
  error?: boolean;
  files: (File | string)[];
  showPreview: boolean;
  onRemove: (file: File | string) => void;
  onUploadFile: any;
  isFileUploading: boolean;
  stepOneNotDone: boolean;
  sx?: SxProps<Theme>;
}

const getFileData = (file: CustomFile | string) => {
  if (typeof file === 'string') {
    return {
      key: file
    };
  }
  return {
    key: file.name,
    name: file.name,
    size: file.size,
    preview: file.preview
  };
};
export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onUploadFile,
  isFileUploading,
  stepOneNotDone,
  sx,
  ...other
}: UploadMultiFileProps) {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up('md'));

  const hasFile = files.length > 0;

  const [alignment, setAlignment] = useState<string | null>('crust');
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    accept: 'image/jpeg, image/png',
    disabled: !stepOneNotDone,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          })
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ width: 220 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop file here or click&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}

      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        <AnimatePresence>
          {files.map((file) => {
            const { key, name, size, preview } = getFileData(file as CustomFile);

            if (showPreview) {
              return (
                <ListItem
                  key={key}
                  component={motion.div}
                  {...varFadeInRight}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'inline-flex'
                  }}
                >
                  <Paper
                    variant="outlined"
                    component="img"
                    src={isString(file) ? file : preview}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                  />
                  <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                    <MIconButton
                      size="small"
                      onClick={() => onRemove(file)}
                      sx={{
                        p: '2px',
                        color: 'common.white',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                        }
                      }}
                    >
                      <Icon icon={closeFill} />
                    </MIconButton>
                  </Box>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={key}
                component={motion.div}
                {...varFadeInRight}
                sx={{
                  my: 1,
                  py: 0.75,
                  px: 2,
                  borderRadius: 1,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  bgcolor: 'background.paper'
                }}
              >
                <ListItemIcon>
                  <Icon icon={fileFill} width={28} height={28} />
                </ListItemIcon>
                <ListItemText
                  primary={isString(file) ? file : name}
                  secondary={isString(file) ? '' : fData(size || 0)}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <ListItemSecondaryAction>
                  <MIconButton edge="end" size="small" onClick={() => onRemove(file)}>
                    <Icon icon={closeFill} />
                  </MIconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      {hasFile && (
        <>
          {isFileUploading ? (
            <LinearProgress color="info" sx={{ my: 3 }} />
          ) : (
            <Divider sx={{ my: 3 }} />
          )}

          <Grid
            container
            sx={{
              // borderRadius: 1,
              // border: (theme) => `solid 1px ${theme.palette.divider}`,
              bgcolor: 'background.paper'
            }}
            spacing={1}
          >
            <Grid item xs={12} md={3}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ height: '100%' }}>
                <Typography variant="h6">Upload file</Typography>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Upload and pin freely to Crust Network with W3Auth. Sign a message with your prefered network to use the service."
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack
                direction="row"
                sx={{ p: 0, width: '100%' }}
                alignItems="center"
                justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                spacing={2}
              >
                <Scrollbar sx={{ maxWidth: '331px' }}>
                  <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                    <ToggleButton
                      value="crust"
                      sx={{ minWidth: '56px' }}
                      onClick={onUploadFile.uploadFileCrust}
                      disabled={!stepOneNotDone}
                    >
                      <Box
                        component="img"
                        src="./static/icons/shared/crust.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton>
                    <ToggleButton
                      value="polygon"
                      sx={{ minWidth: '56px' }}
                      onClick={onUploadFile.uploadFileMetamask}
                      disabled={!stepOneNotDone}
                    >
                      <Box
                        component="img"
                        src="./static/icons/shared/polygon.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton>
                    {/* <ToggleButton value="solana" sx={{ minWidth: '56px' }} disabled>
                      <Box
                        component="img"
                        src="./static/icons/shared/solana.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton>
                    <ToggleButton value="ethereum" sx={{ minWidth: '56px' }} disabled>
                      <Box
                        component="img"
                        src="./static/icons/shared/ethereum.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton>
                    <ToggleButton value="near" sx={{ minWidth: '56px' }} disabled>
                      <Box
                        component="img"
                        src="./static/icons/shared/near.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton>
                    <ToggleButton value="avalanche" sx={{ minWidth: '56px' }} disabled>
                      <Box
                        component="img"
                        src="./static/icons/shared/avalanche.svg"
                        sx={{ height: '24px', width: '32px' }}
                      />
                    </ToggleButton> */}
                  </ToggleButtonGroup>
                </Scrollbar>
              </Stack>
            </Grid>
          </Grid>

          {isFileUploading ? (
            <LinearProgress variant="query" color="info" sx={{ my: 3 }} />
          ) : (
            <Divider sx={{ my: 3 }} />
          )}
        </>
      )}
    </Box>
  );
}
