import React from 'react';
import { ArgsProps } from './svgArgs';
function SvgComponent({ qrcode, title, uploadedCid, ...other }: ArgsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 725 438"
      {...other}
    >
      <foreignObject x="0" y="0" width="725" height="438">
        <img
          src="\static\mock-images\bg_svgs\bg_svg2.png"
          alt="backgound"
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
      </foreignObject>
      <foreignObject x="50" y="100" width="300" height="300">
        {qrcode}
      </foreignObject>
      <foreignObject x="395" y="110" width="270" height="100">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          {title === '' || undefined ? 'Your title' : title}
        </div>
      </foreignObject>
      <foreignObject x="395" y="210" width="270" height="90">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            textJustify: 'inter-word'
          }}
        >
          <p
            style={{
              textAlign: 'center',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
              textAlignLast: 'center',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '14px'
            }}
          >
            {uploadedCid.cid}
          </p>
        </div>
      </foreignObject>

      <foreignObject x="450" y="85" width={651} height={192} transform="scale(0.3)">
        <img
          src="\static\mock-images\bg_svgs\crust-long-black.png"
          alt="logo1"
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
      </foreignObject>

      <foreignObject x="1250" y="90" width={768} height={169} transform="scale(0.3)">
        <img
          src="\static\mock-images\bg_svgs\polygon-long-black.png"
          alt="logo1"
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
      </foreignObject>
    </svg>
  );
}
export default React.memo(SvgComponent);
