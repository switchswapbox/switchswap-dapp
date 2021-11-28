import React from 'react';
import { ArgsProps } from './svgArgs';
function SvgComponent({ qrcode, title, qrcodeHash, uploadedCid, ...other }: ArgsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 725 438"
      {...other}
    >
      <foreignObject x="0" y="0" width="725" height="438">
        <img
          src="\static\mock-images\bg_svgs\bg_svg6.png"
          alt="backgound"
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
      </foreignObject>
      <foreignObject x="200" y="30" width="500" height="70">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#c4a96c'
          }}
        >
          {title === '' || undefined ? 'Your title' : title}
        </div>
      </foreignObject>
      <foreignObject x="200" y="350" width="500" height="25">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
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
              fontSize: '14px',
              color: '#c4a96c'
            }}
          >
            {uploadedCid.cid}
          </p>
        </div>
      </foreignObject>
      <foreignObject x="190" y="110" width="250" height="250">
        {qrcode}
      </foreignObject>
      <foreignObject x="440" y="110" width="250" height="250">
        {qrcodeHash}
      </foreignObject>

      <text
        transform="rotate(-90) translate(-280 230)"
        fontSize="14px"
        letterSpacing=".3em"
        fill="#c4a96c"
      >
        {'IDENTITY'}
      </text>
      <text
        transform="rotate(-90) translate(-305 480)"
        fontSize="14px"
        letterSpacing=".3em"
        fill="#c4a96c"
      >
        {'REGISTRATION'}
      </text>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
