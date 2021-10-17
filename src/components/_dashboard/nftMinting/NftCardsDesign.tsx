// material
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import qrStyles from './qrCardCustomize';
import { IPFS_GATEWAY_FOR_FETCHING_DATA } from 'assets/COMMON_VARIABLES';
import { FileInfoType } from './mintingSteps/StepUploadFile';
import useOffSetTop from 'hooks/useOffSetTop';
import useOffSetTopDistance from 'hooks/useOffsetTopDistance';
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

const CreateQRCode = (uploadedCid: FileInfoType) => {
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

  // eslint-disable-next-line @typescript-eslint/dot-notation
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
};
export default function NftCardsDesign({ nftCards }: any) {
  const { layoutIndex, title, uploadedCid, heightSlideContainer } = useSelector(
    (state: IRootState) => {
      return {
        layoutIndex: state.reducerCustomizeQRCard.icon,
        title: state.reducerCustomizeQRCard.title,
        uploadedCid: state.reducerMintingProcess.uploadedCid,
        heightSlideContainer: state.reducerMintingProcess.heightSlideContainer as number
      };
    }
  );
  const SVGComponent = nftCards[layoutIndex || 0];
  const offset = useOffSetTopDistance();
  const toTakeHeight: any = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    setSvgHeight(toTakeHeight.current.clientHeight);
  }, []);

  return (
    <Box
      ref={toTakeHeight}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: `${
          offset - 1266 > heightSlideContainer - svgHeight
            ? heightSlideContainer - svgHeight
            : offset - 1266
        }px`
      }}
    >
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
        {
          <SVGComponent
            qrcode={CreateQRCode(uploadedCid as FileInfoType)}
            title={title}
            uploadedCid={uploadedCid}
            sx={{ width: '100%' }}
          />
        }
      </Box>
    </Box>
  );
}
