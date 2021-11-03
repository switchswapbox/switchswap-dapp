// material
import { Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import svgArray from 'utils/svg-data';
import { useEffect, useMemo, useState } from 'react';
import html2canvas from 'html2canvas';
import LayoutSelection from './qrCardCustomize/LayoutSelection';
import { changeMintingProcessState } from 'reduxStore/reducerMintingProcess';

// ----------------------------------------------------------------------

export const NftCardsDesign = () => {
  const { layoutIndex, title, uploadedCid, activeStep, transactionHash } = useSelector(
    (state: IRootState) => {
      return {
        layoutIndex: state.reducerCustomizeQRCard.layout,
        title: state.reducerCustomizeQRCard.title,
        uploadedCid: state.reducerMintingProcess.uploadedCid,
        activeStep: state.reducerMintingProcess.activeStep,
        transactionHash: state.reducerMintingProcess.transactionHash
      };
    }
  );
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
        value={`${IPFS_GATEWAY_FOR_FETCHING_DATA[0]}/${uploadedCid?.cid || ''}`}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={url}
        iconScale={0.2}
        {...otherQRProps}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrStyleName, url, otherQRProps]);

  const createQRCodeHash = useMemo(() => {
    const { Component } = qrStyles[qrStyleName];
    console.log(transactionHash);
    return (
      <Component
        value={transactionHash ? transactionHash : ''}
        className="my-qrcode"
        styles={{ svg: { width: '300px' } }}
        icon={url}
        iconScale={0.2}
        {...otherQRProps}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrStyleName, url, otherQRProps, transactionHash]);

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
const SliderSVGCard = () => {
  return (
    <Stack height="100%" display="flex" alignItems="center">
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          position: 'sticky',
          top: 100
        }}
      >
        <NftCardsDesign />
        <LayoutSelection />
      </Stack>
    </Stack>
  );
};

export default SliderSVGCard;
