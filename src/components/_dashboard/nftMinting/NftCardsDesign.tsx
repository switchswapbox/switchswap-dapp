// material
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import svgArray from 'utils/svg-data';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

function NftCardsDesign() {
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

  const CreateQRCode = useMemo(() => {
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

  return (
    <Box
      sx={{
        zIndex: 0,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        width: '90%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <SVGComponent qrcode={CreateQRCode} title={title} uploadedCid={uploadedCid as FileInfoType} />
    </Box>
  );
}

export default function SliderSVGCard() {
  const offset = useOffSetTopDistance();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: `${offset - 1000}px`
      }}
    >
      <NftCardsDesign />
    </Box>
  );
}
