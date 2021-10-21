// material
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import svgArray from 'utils/svg-data';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { width } from '@mui/system';

// ----------------------------------------------------------------------

export function NftCardsDesign() {
  const { layoutIndex, title, uploadedCid } = useSelector((state: IRootState) => {
    return {
      layoutIndex: state.reducerCustomizeQRCard.layout,
      title: state.reducerCustomizeQRCard.title,
      uploadedCid: state.reducerMintingProcess.uploadedCid
    };
  });
  const { icon, qrStyleName } = useSelector((state: IRootState) => {
    return {
      icon: state.reducerCustomizeQRCard.icon,
      qrStyleName: state.reducerCustomizeQRCard.qrStyleName || 'qrNormal'
    };
  });
  const otherQRProps = useSelector((state: IRootState) => {
    // eslint-disable-next-line no-lone-blocks
    {
      return state.reducerCustomizeQRCard?.otherQRProps
        ? state.reducerCustomizeQRCard?.otherQRProps[qrStyleName]
        : undefined;
    }
  });
  const SVGComponent = svgArray[layoutIndex || 0];

  const createQRCode = useMemo(() => {
    const { Component } = qrStyles[qrStyleName];
    return (
      <Component
        value={`${IPFS_GATEWAY_FOR_FETCHING_DATA}/${uploadedCid ? uploadedCid.cid : ''}`}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={icon !== '' ? `./static/mock-images/middle-qr-logo/${icon}.png` : ''}
        iconScale={0.2}
        {...otherQRProps}
      />
    );
  }, [icon, otherQRProps, qrStyleName, uploadedCid]);

  const createQRCard = useMemo(() => {
    return (
      <SVGComponent qrcode={createQRCode} title={title} uploadedCid={uploadedCid as FileInfoType} />
    );
  }, [SVGComponent, createQRCode, title, uploadedCid]);

  return (
    <Box
      sx={{
        zIndex: 0,
        borderRadius: 2,
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
}

interface SliderSVGCardProps {
  parentBoundingBox: React.RefObject<HTMLHeadingElement>;
}

export default function SliderSVGCard({ parentBoundingBox }: SliderSVGCardProps) {
  const cardNFTBoundingBox = useRef<HTMLHeadingElement>(null);

  const topParent = parentBoundingBox?.current?.offsetTop || 0;
  const heightParent = parentBoundingBox?.current?.clientHeight || 0;
  const heightNFT = cardNFTBoundingBox?.current?.clientHeight || 0;

  const offset = useOffSetTopDistance();
  const [offsetWithCondition, setOffsetWithCondition] = useState(0);

  useEffect(() => {
    const topNFT = cardNFTBoundingBox?.current?.offsetTop || 0;
    if (topParent + heightParent > topNFT + heightNFT) {
      setOffsetWithCondition(offset);
    } else if (offset < offsetWithCondition) {
      setOffsetWithCondition(offset);
    } else {
      setOffsetWithCondition((prev) => prev - (topNFT + heightNFT - (topParent + heightParent)));
    }
  }, [heightNFT, heightParent, offset, offsetWithCondition, topParent]);
  const paddingTopPlus = 100;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: {
          xs: 0,
          lg: `${
            offsetWithCondition + paddingTopPlus > topParent
              ? offsetWithCondition + paddingTopPlus - topParent
              : 0
          }px`
        }
      }}
    >
      <Box
        ref={cardNFTBoundingBox}
        sx={{ display: 'flex', justifyContent: 'center', width: '90%' }}
      >
        <NftCardsDesign />
      </Box>
    </Box>
  );
}
