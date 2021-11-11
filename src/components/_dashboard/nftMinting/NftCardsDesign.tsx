import React from 'react';

import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
// import svgArray from 'utils/svg-data';
// import svg7 from 'utils/svg-data/svg7';

import { useEffect, useMemo, useRef, useState } from 'react';
import LayoutSelection from './qrCardCustomize/LayoutSelection';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import { initialQRCard, qrStyleNameType } from 'reduxStore/reducerCustomizeQRCard';
import { CRUST_EXPLORER_EXTRINSIC } from '../../../constants';
const svg1 = React.lazy(() => import('utils/svg-data/svg1'));
const svg2 = React.lazy(() => import('utils/svg-data/svg2'));
const svg3 = React.lazy(() => import('utils/svg-data/svg3'));
const svg4 = React.lazy(() => import('utils/svg-data/svg4'));
const svg5 = React.lazy(() => import('utils/svg-data/svg5'));
const svg6 = React.lazy(() => import('utils/svg-data/svg6'));
const svg7 = React.lazy(() => import('utils/svg-data/svg7'));
const svg8 = React.lazy(() => import('utils/svg-data/svg8'));
const svgArray = [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8];
// ----------------------------------------------------------------------

export const NftCardsDesign = () => {
  const { layoutIndex, title, uploadedCid } = useSelector((state: IRootState) => {
    return {
      layoutIndex: state.reducerCustomizeQRCard.layout,
      title: state.reducerCustomizeQRCard.title,
      uploadedCid: state.reducerMintingProcess.uploadedCid
    };
  });
  const { icon, iconAuthorRegister, qrStyleName, qrStyleNameAuthorRegister } = useSelector(
    (state: IRootState) => {
      return {
        icon: state.reducerCustomizeQRCard.icon,
        iconAuthorRegister: state.reducerCustomizeQRCard.iconAuthorRegister,
        qrStyleName:
          state.reducerCustomizeQRCard.qrStyleName ||
          (initialQRCard.qrStyleName as qrStyleNameType),
        qrStyleNameAuthorRegister:
          state.reducerCustomizeQRCard.qrStyleNameAuthorRegister ||
          (initialQRCard.qrStyleNameAuthorRegister as qrStyleNameType)
      };
    }
  );

  const otherQRProps = useSelector((state: IRootState) => {
    // eslint-disable-next-line no-lone-blocks
    {
      return state.reducerCustomizeQRCard?.otherQRProps
        ? state.reducerCustomizeQRCard?.otherQRProps[qrStyleName]
        : undefined;
    }
  });

  const otherQRPropsAuthorRegister = useSelector((state: IRootState) => {
    // eslint-disable-next-line no-lone-blocks
    {
      return state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister
        ? state.reducerCustomizeQRCard?.otherQRPropsAuthorRegister[qrStyleNameAuthorRegister]
        : undefined;
    }
  });

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
        value={`${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${uploadedCid?.cid || ''}`}
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
