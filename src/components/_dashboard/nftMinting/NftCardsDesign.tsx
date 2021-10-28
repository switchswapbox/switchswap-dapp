// material
import { Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import svgArray from 'utils/svg-data';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import html2canvas from 'html2canvas';
import { downloadNFT } from 'reduxStore/reducerCustomizeQRCard';
import LayoutSelection from './qrCardCustomize/LayoutSelection';

// ----------------------------------------------------------------------

export const NftCardsDesign = () => {
  const { layoutIndex, title, uploadedCid, download } = useSelector((state: IRootState) => {
    return {
      layoutIndex: state.reducerCustomizeQRCard.layout,
      title: state.reducerCustomizeQRCard.title,
      uploadedCid: state.reducerMintingProcess.uploadedCid,
      download: state.reducerCustomizeQRCard.download
    };
  });
  const { icon, qrStyleName } = useSelector((state: IRootState) => {
    return {
      icon: state.reducerCustomizeQRCard.icon,
      qrStyleName: state.reducerCustomizeQRCard.qrStyleName || 'qrNormal'
    };
  });
  const dispatch = useDispatch();

  const otherQRProps = useSelector((state: IRootState) => {
    // eslint-disable-next-line no-lone-blocks
    {
      return state.reducerCustomizeQRCard?.otherQRProps
        ? state.reducerCustomizeQRCard?.otherQRProps[qrStyleName]
        : undefined;
    }
  });
  const SVGComponent = svgArray[layoutIndex || 0];
  const [url, setUrl] = useState('');

  useMemo(() => {
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

  const createQRCode = useMemo(() => {
    const { Component } = qrStyles[qrStyleName];
    return (
      <Component
        value={`${IPFS_GATEWAY_FOR_FETCHING_DATA}/${uploadedCid ? uploadedCid.cid : ''}`}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={url}
        iconScale={0.2}
        {...otherQRProps}
      />
    );
  }, [qrStyleName, uploadedCid, url, otherQRProps]);

  const createQRCard = useMemo(() => {
    return (
      <SVGComponent qrcode={createQRCode} title={title} uploadedCid={uploadedCid as FileInfoType} />
    );
  }, [SVGComponent, createQRCode, title, uploadedCid]);

  const downloadCard = function (href: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
  };

  useEffect(() => {
    if (download) {
      const nftCard = document.getElementById('nftCard') as HTMLElement;
      html2canvas(nftCard, {
        foreignObjectRendering: false,
        scale: 2
      })
        .then(function (canvas) {
          let png = canvas.toDataURL('image/png'); // default png
          downloadCard(png, `${title}.png`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    dispatch(downloadNFT({ download: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [download]);

  return (
    <Box
      id="nftCard"
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
};

interface SliderSVGCardProps {
  parentBoundingBox: React.RefObject<HTMLHeadingElement>;
}
const SliderSVGCard = ({ parentBoundingBox }: SliderSVGCardProps) => {
  const cardNFTBoundingBox = useRef<HTMLHeadingElement>(null);
  const qrStyleName = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.qrStyleName;
  });

  const topParent = parentBoundingBox?.current?.offsetTop || 0;
  const heightParent = parentBoundingBox?.current?.clientHeight || 0;
  const heightNFT = cardNFTBoundingBox?.current?.clientHeight || 0;

  const offset = useOffSetTopDistance();
  const [offsetWithCondition, setOffsetWithCondition] = useState(0);
  const [isBottom, setBottom] = useState(false);

  useEffect(() => {
    const topNFT = cardNFTBoundingBox?.current?.offsetTop || 0;
    if (topParent + heightParent > topNFT + heightNFT) {
      if (!isBottom) {
        setOffsetWithCondition(offset);
      }
    } else if (offset < offsetWithCondition) {
      setOffsetWithCondition(offset);
      setBottom(false);
    } else {
      setOffsetWithCondition((prev) => prev - (topNFT + heightNFT - (topParent + heightParent)));
      setBottom(true);
    }
  }, [heightNFT, heightParent, isBottom, offset, offsetWithCondition, topParent]);
  const paddingTopPlus = 100;

  useEffect(() => {
    setBottom(false);
  }, [qrStyleName]);

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
