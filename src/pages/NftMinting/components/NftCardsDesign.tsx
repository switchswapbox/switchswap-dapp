// material
import { Box, Stack } from '@mui/material';
import { useAppSelector } from '../../../redux/hook';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'constants/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import svgArray from 'pages/NftMinting/components/svg-data';
import { useEffect, useMemo, useRef, useState } from 'react';
import LayoutSelection from './qrCardCustomize/LayoutSelection';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import { initialQRCard, qrStyleNameType } from 'redux/reducerCustomizeQRCard';
import { CRUST_EXPLORER_EXTRINSIC } from '../../../constants';

// ----------------------------------------------------------------------

export const NftCardsDesign = () => {
  const { layoutIndex, title, uploadedCid } = useAppSelector((state) => ({
    layoutIndex: state.reducerCustomizeQRCard.layout,
    title: state.reducerCustomizeQRCard.title,
    uploadedCid: state.reducerMintingProcess.uploadedCid
  }));
  const { icon, iconAuthorRegister, qrStyleName, qrStyleNameAuthorRegister } = useAppSelector(
    (state) => ({
      icon: state.reducerCustomizeQRCard.icon,
      iconAuthorRegister: state.reducerCustomizeQRCard.iconAuthorRegister,
      qrStyleName:
        state.reducerCustomizeQRCard.qrStyleName || (initialQRCard.qrStyleName as qrStyleNameType),
      qrStyleNameAuthorRegister:
        state.reducerCustomizeQRCard.qrStyleNameAuthorRegister ||
        (initialQRCard.qrStyleNameAuthorRegister as qrStyleNameType)
    })
  );

  const otherQRProps = useAppSelector((state) =>
    state.reducerCustomizeQRCard?.otherQRProps
      ? state.reducerCustomizeQRCard?.otherQRProps[qrStyleName]
      : undefined
  );

  const otherQRPropsAuthorRegister = useAppSelector((state) =>
    state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister
      ? state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister[qrStyleNameAuthorRegister]
      : undefined
  );

  const SVGComponent = svgArray[layoutIndex || 0];
  const [url, setUrl] = useState('');
  const [urlHash, setUrlHash] = useState('');

  useEffect(() => {
    if (icon !== '') {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const base_image = new Image();
      base_image.onload = function () {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        context?.drawImage(base_image, 0, 0);
        setUrl(canvas.toDataURL());
      };

      base_image.src = `./static/mock-images/middle-qr-logo/${icon}.png`;
    } else {
      setUrl('');
    }
  }, [icon]);

  useEffect(() => {
    if (iconAuthorRegister !== '') {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const base_image = new Image();
      base_image.onload = function () {
        canvas.width = base_image.width;
        canvas.height = base_image.height;
        context?.drawImage(base_image, 0, 0);
        setUrlHash(canvas.toDataURL());
      };

      base_image.src = `./static/mock-images/middle-qr-logo/${iconAuthorRegister}.png`;
    } else {
      setUrlHash('');
    }
  }, [iconAuthorRegister]);

  const createQRCode = useMemo(() => {
    const { Component } = qrStyles[qrStyleName];
    return (
      <Component
        value={`https://ipfs.io/ipfs/${uploadedCid?.cid || ''}`}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={url}
        iconScale={0.2}
        {...otherQRProps}
      />
    );
  }, [qrStyleName, url, otherQRProps, uploadedCid?.cid]);

  const createQRCodeHash = useMemo(() => {
    const { Component } = qrStyles[qrStyleNameAuthorRegister];
    return (
      <Component
        value={`${CRUST_EXPLORER_EXTRINSIC}${uploadedCid?.txHash || ''}`}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={urlHash}
        iconScale={0.2}
        {...otherQRPropsAuthorRegister}
      />
    );
  }, [qrStyleNameAuthorRegister, urlHash, otherQRPropsAuthorRegister, uploadedCid?.txHash]);

  const createQRCard = useMemo(() => {
    return (
      <SVGComponent
        qrcode={createQRCode}
        qrcodeHash={layoutIndex ? layoutIndex > 3 ? createQRCodeHash : <></> : <></>}
        title={title}
        uploadedCid={uploadedCid as FileInfoType}
      />
    );
  }, [SVGComponent, createQRCode, createQRCodeHash, layoutIndex, title, uploadedCid]);

  return (
    <Box
      id="nftCard"
      sx={{
        zIndex: 0,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {createQRCard}
    </Box>
  );
};

interface SliderSVGCardProps {
  parentBoundingBox: React.MutableRefObject<HTMLDivElement>;
}
const SliderSVGCard = ({ parentBoundingBox }: SliderSVGCardProps) => {
  const cardNFTBoundingBox = useRef() as React.MutableRefObject<HTMLDivElement>;

  const topParent = parentBoundingBox?.current?.offsetTop;
  const heightParent = parentBoundingBox?.current?.offsetHeight;
  const heightNFT = cardNFTBoundingBox?.current?.offsetHeight;

  const offset = useOffSetTopDistance();
  const paddingTopPlus = 120;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: {
          xs: 0,
          lg: `${
            offset < topParent + heightParent - heightNFT - paddingTopPlus
              ? offset - topParent + paddingTopPlus
              : heightParent - heightNFT
          }px`
        }
      }}
    >
      <Box
        ref={cardNFTBoundingBox}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%'
        }}
      >
        <Stack sx={{ width: '100%' }}>
          <NftCardsDesign />
        </Stack>
        <Stack sx={{ width: '100%', alignItems: 'center' }}>
          <LayoutSelection />
        </Stack>
      </Box>
    </Box>
  );
};

export default SliderSVGCard;