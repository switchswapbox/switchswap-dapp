import { Typography, Grid } from '@mui/material';
import { ArgsProps } from './svgArgs';
function SvgComponent({ qrcode, title, uploadedCid, ...other }: ArgsProps) {
  return (
    <svg
      id="prefix__Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 725 438"
      {...other}
    >
      <defs>
        <linearGradient
          id="prefix__linear-gradient"
          x1={719.87}
          y1={219}
          x2={734.75}
          y2={219}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#f5e8b8" />
          <stop offset={0.33} stopColor="#c4a96c" />
          <stop offset={1} stopColor="#664206" />
        </linearGradient>
        <linearGradient
          id="prefix__linear-gradient-2"
          y1={1729.41}
          x2={725}
          y2={1729.41}
          gradientTransform="matrix(1 0 0 .22 0 53.01)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#a28b5e" />
          <stop offset={0.25} stopColor="#fee7b5" />
          <stop offset={0.5} stopColor="#a28b5e" />
          <stop offset={0.75} stopColor="#fee7b5" />
          <stop offset={1} stopColor="#a28b5e" />
        </linearGradient>
        <linearGradient
          id="prefix__linear-gradient-3"
          x1={50.5}
          y1={246}
          x2={674.5}
          y2={246}
          gradientTransform="rotate(-90 362.5 246)"
          xlinkHref="#prefix__linear-gradient-2"
        />
        <linearGradient
          id="prefix__linear-gradient-4"
          x1={485.23}
          y1={232.78}
          x2={569.87}
          y2={192.35}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#a28b5e" />
          <stop offset={0.25} stopColor="#fee7b5" />
          <stop offset={0.5} stopColor="#a28b5e" />
          <stop offset={1} stopColor="#fee7b5" />
        </linearGradient>
        <linearGradient
          id="prefix__linear-gradient-5"
          x1={387.44}
          y1={248.16}
          x2={387.94}
          y2={248.16}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#b48a4e" />
          <stop offset={0.03} stopColor="#c49f60" />
          <stop offset={0.08} stopColor="#e4c884" />
          <stop offset={0.12} stopColor="#f8e29a" />
          <stop offset={0.15} stopColor="#ffeba2" />
          <stop offset={0.39} stopColor="#c9a666" />
          <stop offset={0.45} stopColor="#dbbc74" />
          <stop offset={0.57} stopColor="#ffe790" />
          <stop offset={0.82} stopColor="#b48a4e" />
          <stop offset={0.93} stopColor="#805c38" />
          <stop offset={1} stopColor="#65442d" />
        </linearGradient>
        <linearGradient
          id="prefix__linear-gradient-6"
          x1={655.13}
          y1={454.03}
          x2={1128.02}
          y2={-33.97}
          xlinkHref="#prefix__linear-gradient-4"
        />
        <radialGradient
          id="prefix__radial-gradient"
          cx={361.14}
          cy={-0.43}
          r={649.09}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.38} stopColor="#c8c8c8" />
          <stop offset={0.67} stopColor="#fff" />
          <stop offset={0.82} stopColor="#aaa" />
          <stop offset={1} stopColor="#fff" />
        </radialGradient>
        <radialGradient
          id="prefix__radial-gradient-2"
          cx={185.23}
          cy={-40.43}
          r={645.45}
          gradientTransform="matrix(.87 0 0 .85 199.06 33.77)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.31} stopColor="#c8c8c8" />
          <stop offset={0.67} stopColor="#fff" />
          <stop offset={0.82} stopColor="#aaa" />
          <stop offset={1} stopColor="#fff" />
        </radialGradient>
        <clipPath id="prefix__clip-path">
          <path className="prefix__cls-1" d="M820 0h725v438H820z" />
        </clipPath>
        <style>{'.prefix__cls-1{fill:none}.prefix__cls-5{fill:#1c1b1a}'}</style>
      </defs>
      <path fill="url(#prefix__linear-gradient)" d="M720 0h5v438h-5z" />
      <path fill="url(#prefix__radial-gradient)" d="M0 0h725v438H0z" />
      <path
        d="M725 157.43l-7.41 7.17 7.41 7.17v1.29l-8.08-7.82-24.17-23.36h-24l-23.31-22.53v21.89l23.7 22.9h24l23.78 23 8.08 7.81v1.29l-8.08-7.81-24.17-23.36h-24l-24.25-23.44v-23.19L596.58 72.1V48.92l-23.5-22.71-.67-.65.67-.64 23.78-23h24l2-1.93h1.33l-2.94 2.84h-24l-23.5 22.72 23.77 23v23.17l48 46.34L669.17 141h24l23.78 23 8.08-7.81zM693.42 72.1l-23.31 22.52h22.64l23.7-22.9V47.63L725 55.9v1.29l-7.61-7.35v21.88l7.61 7.35v1.29l-8.08-7.81-23.31 22.53 23.31 22.53 8.08-7.81v1.29l-7.61 7.35v24.09l-24.64-23.82h-24L645 95.73 620.55 72.1V48.92L595.91 25.1h24.92l.2-.18 23.5-22.72V0h.94v2.2l24.17 23.36-24.17 23.36v23.44h-.94V48.92L620.83 26h-22.64l23.31 22.54v23.18L645 94.43l23.5-22.71V48.54l23.78-23-23.78-23V0h.94v2.2L693 24.92l.66.64-.66.65-23.56 22.71V72.1l-23.77 23 23.5 22.72h24l23.31 22.52v-21.9L693 95.73l-.2-.19h-24.97l24.64-23.82V48.54l23.78-23-23.78-23V0h.95v2.2l23.5 22.72 8.08 7.81V34l-8.08-7.81-23.5 22.71zm-71.73-46.54L645 48.09l23.3-22.53L645 3zm94.76 255.09v-23.17l-23.7-22.9h-22.64l23.31 22.52v23.18l23.5 22.72.67.65L693.42 327v23.17l-23.31 22.53h22.64l23.5-22.7.2-.18v-23.2l8.55-8.27v1.29l-7.61 7.36v21.88l7.61-7.35v1.29l-7.61 7.35-.47.46-23.31 22.53 23.31 22.53.67.64 7.41 7.17v1.29l-8.08-7.79-.67-.65L693 373.8l-.2-.19h-24.97l24.64-23.81v-23.18l23.78-23-23.78-23v-23.14l-23.69-22.9-.48-.46-23.3-22.53-24.17-23.36h-24l-23.78-23L549.58 188v23.17l-23.78 23 23.78 23v23.18l23.5 22.65 23.5-22.71V257.1l23.31-22.52h-22.64l-23.7 22.9v23.44h-.94v-23.44l-24.17-23.36 24.17-23.36v-24.09l24.64 23.82h24l23.78 23 24.44 23.63v23.18l24.17 23.36-24.2 23.34v23.17l-23.77 23 23.5 22.71h24l23.78 23 .67.64 3.24 3.14c-.16.27-.32.54-.49.81l-3.42-3.3-.67-.65-23.5-22.71h-24L645 373.8l-23.78 23h-24l-23.7 22.9-.47.46L554.61 438h-1.33l19.13-18.5.2-.18v-23.18l23.77-23-23.3-22.53-23.78 23-23.7 22.91v23.17L506.66 438h-1.33l19.33-18.68v-23.18L548 373.61h-22.67L501.16 397v-1.29l23.78-23h24l.2-.19 24-23.17 24.17 23.36h24.19v.91h-24.25l-23.7 22.91v21.87l23.31-22.53h24l23.5-22.71-23.5-22.72h-24l-23.78-23-23.78 23h-24.64v-.91h24.25l23.5-22.72.67-.64.67.64 23.5 22.72h24l23.78 23 23.5-22.71v-23.2l23.78-23-23.78-23v-23.14L645 234.76l-23.5 22.72v23.17l-23.31 22.53h22.64l23.7-22.9v-23.44h.94v23.44L669 303l.67.65-24 23.17-.2.19v24.09l-24.64-23.82h-24l-23.78-23-23.78 23h-24l-24.17 23.36v-1.29l23.78-23h24l23.5-22.72-23.78-23v-23.15l-23.5-22.72-.67-.64 24.17-23.36v-23.18L573.08 164l24.17 23.37h24l23.78 23 24.17 23.36h24l24.25 23.44v23.18l7.61 7.35v1.29zm-94.76 23L645 326.17l23.3-22.53-23.3-22.53zm-25.31-69.52l-23.3-22.53-23.31 22.53 23.31 22.53zm-22.63 69.52l23.5 22.72h24l23.31 22.52V327l-23.7-22.91h-24.95l24.64-23.81V257.1l23.78-23-23.5-22.72h-24l-23.31-22.53v21.89l23.7 22.9h24.91l-24.64 23.82v23.17zm71.92 115.85l-.67-.64-.67.64L625.2 438h1.33L645 420.15 663.47 438h1.33zm63.1 14.66l-15.63-15.11h-24l-23.5-22.72-.67-.64-.67.64-23.5 22.72h-24L577.25 438h1.33l18.67-18h24L645 397l23.78 23h24l15.12 14.6zM725 364.7l-8.08 7.81-.67.65.67.64 8.08 7.81v-1.29l-7.41-7.16L725 366zm-151.25 8.46l-.67-.65-24.45 23.63v23.18L529.3 438h1.34l18.94-18.31v-23.17zM22.17 2.58v-1.2c-.32.09-.63.2-1 .3v.52L1.47 21.29c-.19.59-.37 1.19-.52 1.8zM284.93 0v3.49L288.54 0h-1.34l-1.33 1.29V0zm192.73 211.4v-23.82l-23.78-23 23.78-23v-23.14l23.5-22.72.67-.64-.67-.64-23.78-23h-24l-24.14-23.35-24.17 23.36h-24l-24.42 23.63.67.65 24.17-23.37h24l23.78-23 23.78 23h24l23.5 22.72-23.77 23v23.18L453.22 164l-.67.65.67.64 23.5 22.71v23.4zM725 241.29v1.29l-8.08-7.82-.67-.64-23.5-22.72h-24l-23.78-23-24-23.18-.2-.18h-24l-23.78-23-23.22 22.56L525.6 188v23.17l-23.77 23 23.77 23v23.18l24.64 23.81h-24.91l-24.17 23.36-24.64-23.81-23.78-23v-23.23l-24.17-23.36.67-.65 24.45 23.63v23.18l24.17 23.36 23.3 22.52 23.3-22.52-23.3-22.53v-1.29l24.17 23.36H548l-23.31-22.53v-23.17l-23.5-22.72-.67-.64.67-.64 23.5-22.71v-23.19L548 165.06h-22.67l-24.17 23.35-24-23.17-.67-.64.67-.65 24-23.17 23.78-23h24l23.5-22.72-23.78-23V48.92l-23.5-22.71-.67-.65.67-.64L548.63 2.2V0h1v2.58l-23.78 23 23.78 23v23.14l23.5 22.71 24.44 23.63v23.18l24.17 23.36L645 187.13l24.17 23.36h24l23.78 23zm-105.11-77.15l-23.31-22.52v-23.18l-23.5-22.71-23.78 23h-24l-24.17 23.36-23.3 22.53 23.3 22.53 23.78-23h24l.2-.19 23.5-22.71v-21.9l-23.31 22.53h-24l-24.17 23.36V164l23.78-23h24l24.64-23.82v24.09l23.7 22.9zm97 46.16l-23.78-23h-24L645 164l-23.5-22.71v-23.23l-24.45-23.63-23.5-22.71V48.54l-23.78-23 23.78-23L576.22 0h-1.34l-1.33 1.29V0h-.94v2.2l-23.5 22.72-.67.64.67.65 23.5 22.71V72.1l24.44 23.63 23.5 22.71v23.18L645 165.24l23.78 23h24l24.17 23.36 8.05 7.8v-1.29zM481.36 438h1.33l18.47-17.85v-1.29zM309.57 2.84h24L336.49 0h-1.34l-2 1.93h-24l-23.78 23L261.9 2.2V0h-.9v2.58l24.4 23.63zM0 325.25l21.89-21.16h24.92l-24.64-23.81V257.1L0 235.68V237l21.22 20.51v23.17l23.31 22.53H21.89L0 282v1.29l21 20.33L0 324zm142.23 94.25l-.67-.64-.67.64-19.13 18.5h1.33l18.47-17.85L160 438h1.33zm47.47-.45h-24l-23.5-22.72-.67-.64-.67.64-23.5 22.72h-24L73.81 438h1.34l18.66-18h24l23.78-23 23.78 23h24L208 438h1.33zm240.21-45.89l-.67-.65-24.44 23.63v23.18L385.47 438h1.33l18.94-18.31v-23.17zM477.66 0h-.94v2.2L452.08 26H477l.2.19 24 23.17v-1.27l-23.3-22.53L501.16 3V1.74L477 25.1h-22.65l23.31-22.52zM0 116.7l21.69-21 .2-.19h24.92L22.17 71.72V48.54L.18 27.29c0 .39-.08.79-.1 1.19l21.14 20.44V72.1l23.31 22.52H21.89L0 73.46v1.29l21 20.33-21 20.33zm69.64 255.81L45.2 396.14v23.18l-18.89 18.25 1.16.17 18.67-18.05v-23.17l24.17-23.36zm407.08-22.34V327l-24.17-23.36-23.31-22.53-.47-.46-23.7-22.9h-24l-23.78-23-23.78 23h-24l-24.64 23.82v-24.09l-23.7-22.9h-22.58l23.31 22.52v23.18L285.4 303l23.78-23h24l23.5-22.72.67-.64.67.64L381.49 280h24l23.78 23 .67.65 23.78 23v23.15l23.5 22.71.67.65-.67.64-23.5 22.72v23.17L434.75 438h-1.34l19.33-18.68v-23.18l23.78-23-23.78-23V327l-23.5-22.72-23.78 23h-24l-24.64 23.82V327l-.2-.19-23.5-22.72h-22.61l23.31 22.53v23.18l23.5 22.71 23.78-23h24l24.64-23.82v24.11l.2.18 23.31 22.53.66.65-.66.64-23.51 22.72v23.17L410.77 438h-1.33l19.33-18.68v-23.18l23.78-23-23.31-22.53-23.3 22.53-.48.45-23.69 22.91v23.17L362.83 438h-1.34l19.33-18.68v-23.18l23.31-22.53h-22.64L358 396.33l-.2.19v22.8l.2.18-.2.19v.31h-.27l-18.67 18h-1.33l19.33-18.68v-21.89L333.54 420h-24l-18.66 18h-1.34l19.61-18.95h24l23.7-22.91.47-.45 23.78-23h24l.2-.19 23.5-22.71v-21.88l-23.31 22.53h-24L358 373.16l-.67.64-23.78 23h-24l-23.5 22.71-.67.65-.67-.65-23.5-22.71h-24l-23.78-23-.67-.64.67-.65 23.78-23h24l24.64-23.82v24.11l.2.18 23.5 22.72h22.64l-23.29-22.53V327l-23.5-22.72-23.78 23h-24L214 350.17l-.47.46-23.3 22.53 23.3 22.53.67.64 23.5 22.72h24L281.23 438h-1.33l-18.67-18h-24l-23.78-23-.67-.65-23.3-22.53-.2-.19H164.4L189 349.8v-23.18l23.77-23-23.77-23v-23.14l-23.7-22.9-.47-.46-23.31-22.53-24.17-23.36h-24l-23.78-23L46.14 188v23.17l-23.78 23 23.78 23v23.18L69.64 303l23.5-22.71V257.1l23.31-22.52H93.81l-23.7 22.9v23.44h-.94v-23.44L45 234.12l24.17-23.36v-24.09l24.64 23.82h24l23.78 23L166 257.1v23.18l24.17 23.36L166 327v23.17l-23.78 23 23.5 22.71h24l23.78 23 .67.64L233.28 438H232l-18.47-17.85-.67-.65-23.5-22.71h-24l-23.78-23-23.78 23h-24l-23.7 22.9-.47.46L51.17 438h-1.33L69 419.5l.2-.18v-23.18l23.78-23-23.34-22.51-23.78 23-23.69 22.89v23.17l-11.25 10.87-.71-.6 11-10.64v-23.18l23.31-22.53H21.89L0 394.77v-1.29l21.5-20.78h24l.2-.19 24-23.17 24.11 23.36h24.25v.91H93.81l-23.7 22.91v21.88l23.31-22.53h24l23.5-22.71-23.5-22.72h-24l-23.78-23-23.78 23H21.22v-.91h24.25L69 326.81l.67-.64.67.64 23.5 22.72h24l23.78 23 23.5-22.71v-23.2l23.78-23-23.78-23v-23.14l-23.5-22.72-23.5 22.72v23.17l-23.37 22.53h22.64l23.7-22.9v-23.44h.91v23.44L165.53 303l.67.65-24 23.17-.2.19v24.09l-24.64-23.82h-24l-23.78-23-23.78 23h-24L0 348.43v-1.29l21.5-20.78h24L69 303.64l-23.77-23v-23.16l-23.54-22.72-.66-.64 24.17-23.36v-23.18L69.64 164l24.17 23.37h24l23.78 23 24.17 23.36h24L214 257.1v23.18l23.7 22.9h22.64L237 280.65v-23.17l-23.5-22.72-.67-.64-23.5-22.72h-24l-23.78-23-24-23.18-.2-.18h-24l-23.78-23-23.23 22.56L22.17 188v23.17L0 232.56v-1.29l21.22-20.51v-23.18l23.31-22.52H21.89L0 186.22v-1.3l21.5-20.78h24l.2-.19 23.5-22.71v-21.89l-23.34 22.53h-24L0 163v-1.29L21.5 141h24l24.64-23.82v24.09l23.7 22.9h22.64l-23.34-22.55v-23.18l-23.5-22.71-23.78 23h-24L0 139.87v-1.29l21.5-20.78h24L69 95.08 45.2 72.1V48.92L21.69 26.21l-.69-.65.66-.64L45.2 2.2V0h.94v2.58l-23.78 23 23.78 23v23.14l23.5 22.71 24.45 23.63v23.18l24.17 23.36 23.3 22.53 24.17 23.36h24l23.78 23 24.45 23.63v23.18l24.64 23.81h-24.95L214 327v21.88l23.31-22.52h24l23.5-22.72-23.77-23v-23.16l-23.7-22.9-23.78-23-24.17-23.36h-24l-23.78-23-24.44-23.62v-23.16L93.61 95.73 69.17 72.1V48.92l-23.5-22.71-.67-.65.67-.64L69.17 2.2V0h.94v1.29L71.44 0h1.34l-2.67 2.58-23.77 23 23.77 23v23.14l23.5 22.71 24.45 23.63v23.18l23.5 22.76 24.17 23.37h24l23.78 23 24 23.21.16.15h24l23.78 23 23.31-22.53-23.36-22.61-.23-.23-.24-.23-23.7-22.9h-24l-23.78-23-24.17-23.36h-24L142 119.35v21.89l23.7 22.9h24l23.78 23 24.17 23.36h24l24.45 23.63-.67.64-24.2-23.37h-24l-23.78-23-24.17-23.36h-24l-24.25-23.44v-23.16L93.14 72.1V48.92l-23.5-22.71-.64-.65.67-.64 23.78-23h24l2-1.93h1.33l-2.94 2.84h-24L70.31 25.56l23.78 23v23.16L142 118.06 165.73 141h24l23.78 23L237 141.24v-23.18l23.31-22.52h-22.66L214 118.44v24.09l-24.64-23.82h-24l-23.78-23-24.46-23.61V48.92L92.48 25.1h24.91l.2-.18 23.5-22.72V0h.91v2.2l24.2 23.36L142 48.92v23.44h-.94V48.92L117.39 26H94.75l23.31 22.52v23.2l23.5 22.71 23.5-22.71V48.54l23.78-23-23.78-23V0h.94v2.2l23.5 22.72.67.64-.67.65L166 48.92V72.1l-23.78 23 23.5 22.72h24l23.28 22.5v-21.88l-23.5-22.71-.2-.19h-24.9L189 71.72V48.54l23.77-23L189 2.58V0h1v2.2l23.5 22.72 24.17 23.36h24l23.31 22.53V48.92l-23.5-22.71-.2-.19h-24L213 2.58V0h1v2.2l23.7 22.9h22.64L237 2.58V0h1v2.2l23.69 22.9 23.78 23 23.78-23h24l.2-.18 24-23.18L359.12 0h1.34l-3.14 3L334 25.56l-24.15 23.36V72.1l-23.78 23 23.5 22.72h24l23.31 22.52v-21.9l-23.5-22.71-.2-.19h-24.94l24.64-23.82V48.54l24.44-23.62 23.78-23h24l2-1.93h1.34l-3 2.84h-24l-24.12 23.38-23.5 22.71V72.1l-23.31 22.52h22.64l23.7-22.9V48.54L381.1 25.1h24l23.7-22.9V0h.94v2.58L405.46 26h-24l-23.7 22.9v21.91l23.34-22.53h24l24.17-23.36L452.74 2.2V0h.95v2.58l-23.78 23 23.5 22.72h24l23.78 23 24.17 23.35H548L524.66 72.1V48.92l-23.5-22.71-.67-.64.67-.64 23.5-22.73V0h.94v2.58l-23.77 23 23.77 23v23.14l24.64 23.82h-24.91l-.2.19-24 23.17v-1.29l23.3-22.53-23.3-22.53L477 49.19h-24l-23.78-23-23.78 23h-24L357.79 72.1 334 95.08l23.3 22.53 23.78-23h24l.2-.19 24-23.17 24 23.17.19.19h24.92l-24.64 23.82v23.18l-23.78 23 23.78 23v23.18l24.17 23.36 23.3 22.53v1.29l-24-23.18-24.45-23.63V188l-23.5-22.72-23.78 23h-24l-24.64 23.82V188l-23.7-22.9h-22.64l23.31 22.52v23.18l23.5 22.71 23.78-23h24l24.64-23.82v24.09l24.17 23.36 23.78 23v23.18L501.16 303v1.29l-24.44-23.63v-23.18l-23.5-22.72-24-23.17-23.3 22.53 23.77 23v23.18l.2.19L453.22 303l24.44 23.63v23.17l23.5 22.71.67.64-.67.64-23.5 22.72v23.17L458.72 438h-1.33l19.33-18.68v-23.18l23.77-23zM118.26 25.56l23.3 22.53 23.31-22.53L141.56 3zm0 278.08l23.3 22.53 23.31-22.53-23.31-22.53zM93 234.12l-23.36-22.53-23.3 22.53 23.3 22.53zm-22.69 69.52l23.5 22.72h24l23.31 22.52V327l-23.7-22.91H92.48l24.64-23.81V257.1l23.77-23-23.5-22.72h-24l-23.28-22.51v21.89l23.7 22.9h24.92l-24.64 23.82v23.17zm166.48 0l-23.78-23v-23.16l-23.7-22.9h-22.64L190 257.1v23.18L213.48 303l.67.65L190 327v23.17l-23.33 22.53h22.64l23.5-22.7.2-.18v-23.2zm48.61 47l-23.3 22.53 23.3 22.53 23.31-22.53zm71.92-24.46l23.31-22.53-23.31-22.53L334 303.64zm-71.25-22.53l23.78 23v23.15l24.64 23.81h-24.92l-.19.19-23.31 22.53-.67.65-.67-.65-23.5-22.72H237v-.91h24.25l23.7-22.9v-21.89l-23.31 22.53h-24l-23.5 22.72 23.5 22.71h24l23.78 23 23.78-23h24l23.5-22.71-23.77-23V327l-24.64-23.82h24.91l.2-.19 23.3-22.52.67-.65.67.65 23.5 22.71h24.25v.91h-24.3L357.79 327v21.88l23.31-22.52h24l23.5-22.72-23.5-22.72h-24l-23.78-23-23.78 23h-24zm143.64-185.2v23.18l-24.25 23.44h-24l-.2.18L357.79 188v21.88l23.31-22.52h24L429.24 164l23.5-22.71v-23.23l23.31-22.52h-22.64zm-47.94 0v23.18l-24.45 23.62-24.17-23.36h-24l-23.31-22.53v21.89L309.38 164l.19.19h24l23.78 23 23.31-22.53 24.17-23.36v-23.24l24.44-23.63.67.65-24.17 23.36v23.18l-23.31 22.52h22.64l23.7-22.9v-23.18l23.78-23-23.34-22.51-23.3 22.53zM285.4 95.73l-23.5 22.71v23.18l-23.31 22.52h22.64l23.7-22.9v-24.09L309.57 141h24l23.78 23 23.5-22.71v-23.23l23.31-22.52h-22.67l-23.7 22.9v24.09l-24.64-23.82h-24zM213 71.72V47.63l24.64 23.82h24l23.78 23 23.5-22.71v-23.2L332.21 26h-22.64l-23.7 22.9V73l-24.64-23.81h-24l-23.78-23L190 48.92V72.1l-23.33 22.52h22.64zm23.78 23.36l-23.3-22.53-23.3 22.53 23.3 22.53zM284.93 188l-23.5-22.72-.2-.18h-24.91L261 141.24v-23.18l23.77-23-23.5-22.72h-24L214 49.84v21.88l23.5 22.71.2.19h24.92l-24.64 23.82v23.18l-23.78 23 23.5 22.72h24l23.31 22.52zm71.72 46.16l-23.77-23V188l-24.17-23.4-23.31-22.53-23.3 22.53 23.77 23v23.18l23.7 22.9h22.64l-23.31-22.55V188l-24.17-23.4.67-.65 24.45 23.63v23.18l24.64 23.82h-24.92l-.19.18-23.51 22.72v21.88l23.31-22.52h24zm72.12 23.36l-23.7-22.9h-24.25v-.92h24.25l23.7-22.9v-21.93l-23.31 22.53h-24L358 234.12l23.5 22.72h24l23.31 22.52z"
        opacity={0.5}
        fill="url(#prefix__radial-gradient-2)"
      />
      <path className="prefix__cls-1" d="M0 0h725v438H0z" />
      <path
        className="prefix__cls-5"
        d="M241.57 51.29C248.26 63 255.17 74 263.1 57.84c1.09-2.08 1.88-6.12 3.65-6.12s2.57 4 3.65 6.12c7.94 16.16 14.85 5.16 21.53-6.53.51-.88 1-1.73 1.4-2.46-15.32 9.7-14-19.6-26.58-19.83-12.55.23-11.26 29.53-26.58 19.83l1.4 2.46M240.75 29a6.94 6.94 0 106.93 6.94 6.94 6.94 0 00-6.93-6.94zM292.76 29a6.94 6.94 0 106.93 6.94 6.94 6.94 0 00-6.93-6.94zM234.57 74.76h1.23a.82.82 0 01.51.17.46.46 0 01.22.34.27.27 0 01-.26.26.29.29 0 01-.23-.12.33.33 0 00-.22-.11h-1.22q-.18 0-.18.15a.16.16 0 00.12.15l1.43.64a.88.88 0 01.36.31.86.86 0 01.14.47.82.82 0 01-.25.59.8.8 0 01-.55.23h-1.09a.89.89 0 01-.52-.16c-.16-.12-.25-.23-.25-.33a.27.27 0 01.08-.19.26.26 0 01.21-.08.38.38 0 01.22.11.43.43 0 00.33.12h1a.25.25 0 00.2-.09.32.32 0 00.08-.21.27.27 0 00-.18-.26l-1.44-.65a.86.86 0 01-.32-.27.69.69 0 01.09-.86.65.65 0 01.49-.21zM240.71 76v.64l.35.62.19-.62.06-1.56a.27.27 0 01.08-.19.26.26 0 01.19-.08.29.29 0 01.19.08.22.22 0 01.07.19l-.05 1.67-.29 1a.24.24 0 01-.25.19H241a.26.26 0 01-.24-.14l-.29-.51-.29.5a.3.3 0 01-.24.15h-.28a.26.26 0 01-.17 0 .22.22 0 01-.09-.13l-.28-1L239 75a.29.29 0 01.08-.19.3.3 0 01.2-.08.25.25 0 01.18.08.26.26 0 01.08.19l.06 1.57.18.6.37-.63V76a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.09.19zM246.52 77.84h-1.64a.26.26 0 01-.19-.08.27.27 0 010-.38.26.26 0 01.19-.08h.55v-2h-.54a.26.26 0 01-.19-.08.25.25 0 01-.08-.19.22.22 0 01.08-.19.23.23 0 01.19-.09h.81a.23.23 0 01.19.09.22.22 0 01.11.16v2.3h.54a.27.27 0 01.19.08.27.27 0 010 .38.25.25 0 01-.21.08zm-1.1-4.48h.28a.26.26 0 01.19.08.22.22 0 01.08.19v.23a.24.24 0 01-.08.19.22.22 0 01-.19.08h-.28a.26.26 0 01-.2-.08.28.28 0 01-.07-.19v-.23a.26.26 0 01.08-.19.27.27 0 01.19-.08zM251.5 77.84h-.5a.77.77 0 01-.57-.23.78.78 0 01-.24-.57V75.3h-.28a.29.29 0 01-.19-.08.29.29 0 010-.38.29.29 0 01.19-.08h.29v-.66a.26.26 0 01.07-.19.29.29 0 01.19-.08.27.27 0 01.19.08.25.25 0 01.08.19v.66h1.08a.26.26 0 01.19.08.27.27 0 010 .38.26.26 0 01-.19.08h-1.08V77a.25.25 0 00.08.19.27.27 0 00.19.08h.53a.28.28 0 00.28-.23q.07-.24.27-.24a.28.28 0 01.2.08.27.27 0 01.07.2.72.72 0 01-.23.48.75.75 0 01-.62.28zM257.32 77.84h-1.15a.8.8 0 01-.52-.18l-.52-.45a.72.72 0 01-.25-.56V76a.75.75 0 01.28-.6l.47-.4a.76.76 0 01.49-.19h1.2a.26.26 0 01.19.08.27.27 0 010 .38.26.26 0 01-.19.08h-1.15a.37.37 0 00-.21.08l-.43.37a.3.3 0 00-.1.24v.66a.22.22 0 00.08.18l.47.4a.36.36 0 00.24.08h1.1a.25.25 0 01.19.08.26.26 0 01.08.19.29.29 0 01-.08.19.26.26 0 01-.19.02zM260.13 77.58v-3.72a.25.25 0 01.08-.18.27.27 0 01.19-.08.26.26 0 01.19.08.27.27 0 01.08.19v1.36l.43-.28a1 1 0 01.53-.19h.37a.77.77 0 01.56.23.83.83 0 01.25.58l.07 2a.29.29 0 01-.08.19.26.26 0 01-.19.07.22.22 0 01-.19-.08.25.25 0 01-.08-.18l-.07-2a.27.27 0 00-.27-.27h-.3a.49.49 0 00-.23.08l-.76.5v1.71a.29.29 0 01-.08.19.25.25 0 01-.19.07.26.26 0 01-.19-.07.29.29 0 01-.12-.2zM266.15 74.76h1.24a.8.8 0 01.5.17.46.46 0 01.22.34.22.22 0 01-.08.18.25.25 0 01-.18.08.31.31 0 01-.23-.12.33.33 0 00-.22-.11h-1.22q-.18 0-.18.15a.16.16 0 00.12.15l1.43.64a.77.77 0 01.36.31.86.86 0 01.14.47.78.78 0 01-.25.59.8.8 0 01-.55.23h-1.09a.89.89 0 01-.52-.16q-.24-.18-.24-.33a.24.24 0 01.08-.19.24.24 0 01.2-.08.35.35 0 01.22.11.43.43 0 00.33.12h1a.25.25 0 00.19-.09.28.28 0 00.08-.21.27.27 0 00-.18-.26l-1.44-.65a.86.86 0 01-.32-.27.69.69 0 01.09-.86.65.65 0 01.5-.21zM272.29 76v.64l.36.62.18-.62.06-1.56a.27.27 0 01.08-.19.29.29 0 01.19-.08.27.27 0 01.19.08.26.26 0 01.08.19l-.06 1.67-.29 1a.24.24 0 01-.25.19h-.29a.26.26 0 01-.24-.14l-.29-.51-.29.5a.3.3 0 01-.24.15h-.28a.26.26 0 01-.17 0 .22.22 0 01-.09-.13l-.28-1-.06-1.81a.22.22 0 01.08-.19.27.27 0 01.19-.08.25.25 0 01.18.08.26.26 0 01.08.19l.07 1.57.17.6.37-.63V76a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.08.19zM276.73 75.91h1a.91.91 0 01.25 0v-.38a.26.26 0 00-.08-.19.24.24 0 00-.19-.08h-1a.26.26 0 01-.19-.08.25.25 0 01-.08-.19.22.22 0 01.08-.19.26.26 0 01.19-.08h1a.81.81 0 01.57.23.87.87 0 01.24.58l.07 2a.29.29 0 01-.08.19.26.26 0 01-.19.07.29.29 0 01-.2-.07.29.29 0 01-.08-.19l-.45.26h-.91a.78.78 0 01-.58-.23.82.82 0 01-.23-.58v-.31a.76.76 0 01.24-.57.78.78 0 01.62-.19zm1.34 1v-.22a.3.3 0 00-.08-.2.26.26 0 00-.19-.07h-1.06a.24.24 0 00-.19.08.26.26 0 00-.08.19V77a.29.29 0 00.08.19.27.27 0 00.19.08h.76zM281.74 77.54v1.19a.27.27 0 01-.08.19.24.24 0 01-.19.08.22.22 0 01-.19-.08.25.25 0 01-.09-.19V74.9a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.08.19v.17a1.06 1.06 0 01.77-.43h.12a.79.79 0 01.53.21l.44.38a.82.82 0 01.3.65v.84a.86.86 0 01-.32.67l-.44.37a.73.73 0 01-.55.2h-.11a.72.72 0 01-.53-.21zm.76-.12h.13a.29.29 0 00.21-.1l.42-.37a.27.27 0 00.11-.22v-.87a.29.29 0 00-.12-.23l-.45-.38a.23.23 0 00-.17-.07h-.15a.41.41 0 00-.24.15l-.4.39a.33.33 0 00-.1.24v.69a.35.35 0 00.12.24l.38.39a.42.42 0 00.26.14zM287.53 76.15h.55a.25.25 0 01.18.08.22.22 0 01.08.19v.46a.26.26 0 01-.07.19.29.29 0 01-.19.08h-.55a.26.26 0 01-.19-.08.22.22 0 01-.08-.19v-.46a.22.22 0 01.08-.19.27.27 0 01.19-.08zM293.89 77.84h-1.64a.27.27 0 010-.54h.55v-2h-.54a.26.26 0 01-.19-.08.29.29 0 01-.07-.22.26.26 0 01.08-.19.23.23 0 01.19-.09h.82a.25.25 0 01.19.09.26.26 0 01.08.19v2.3h.53a.3.3 0 01.2.08.27.27 0 010 .38.29.29 0 01-.2.08zm-1.09-4.48h.28a.27.27 0 01.19.08.26.26 0 01.08.19v.23a.27.27 0 01-.08.19.24.24 0 01-.19.08h-.29a.22.22 0 01-.19-.08.25.25 0 01-.08-.19v-.23a.22.22 0 01.08-.19.26.26 0 01.2-.08zM299.69 75.73v1.13a.88.88 0 01-.34.67 1 1 0 01-.7.31H298a1.08 1.08 0 01-.71-.31.92.92 0 01-.33-.67v-1.13a.88.88 0 01.33-.66 1 1 0 01.71-.32h.63a1.06 1.06 0 01.7.3.9.9 0 01.36.68zm-2.17 0v1.09a.28.28 0 00.11.23l.2.17a.27.27 0 00.19.06h.62a.35.35 0 00.25-.1l.16-.14a.25.25 0 00.1-.22v-1.06a.27.27 0 00-.1-.24l-.19-.15a.33.33 0 00-.22-.08h-.56a.41.41 0 00-.28.09l-.18.15a.3.3 0 00-.1.22z"
      />
      <path
        d="M338.46 44.21l14.69-8.48a1.64 1.64 0 011.63 0l9.22 5.34a1.63 1.63 0 01.33 2.57l-3.13 3.16a1.65 1.65 0 01-2 .26l-4.46-2.58a1.66 1.66 0 00-1.67 0l-15.49 9v-7.85a1.63 1.63 0 01.88-1.42z"
        fill="#fa8c16"
      />
      <path
        className="prefix__cls-5"
        d="M364.07 66.91l-9.29 5.36a1.59 1.59 0 01-1.63 0l-14.69-8.48a1.62 1.62 0 01-.82-1.41v-7.15l7.57-4.39V58a1.63 1.63 0 00.81 1.41l7.13 4.11a1.59 1.59 0 001.63 0l4.51-2.6a1.63 1.63 0 012 .26l3.14 3.15a1.63 1.63 0 01-.36 2.58zM423.42 39.46v22.21c0 1.52-.64 1.7-2.06 1.7h-11.27a1.65 1.65 0 01-1.19-.44c-.17-.16-.45-.13-.45-1.52V39.46h-5.7V62a6.33 6.33 0 001.94 4.73 7.18 7.18 0 005.21 1.81h12a7.27 7.27 0 005.1-1.87 6.32 6.32 0 002.07-5.19v-22zM457.9 53.31a5.77 5.77 0 00-4.43-1.82h-10.33a2 2 0 01-1.52-.57 1.71 1.71 0 01-.5-1.42v-3a1.89 1.89 0 01.47-1.43c.21-.21.54-.46 1.76-.46h16v-5.16H441.3a6 6 0 00-5.1 2.66 6.69 6.69 0 00-.77 3.77v5.4a5.22 5.22 0 001.28 3.83 5.54 5.54 0 004.1 1.57h10.86a2.32 2.32 0 011.5.39 1.57 1.57 0 01.7 1.24v2.93c0 1.43-.28 1.41-.44 1.57a2.28 2.28 0 01-1.63.57h-16.4v5.18h17.51a6.63 6.63 0 005-2 6.74 6.74 0 001.69-4.85v-3.4a7.18 7.18 0 00-1.7-5zM466.36 39.46v5.18h9.51v23.91h5.69V44.64h9.63v-5.18h-24.83zM396.88 51.52c.14-1.7 0-5.68 0-5.68a6 6 0 00-3.44-5.71 9.23 9.23 0 00-4.14-.7H371.85l2.57 5.18h14.08c1.25 0 2.68.22 2.68 2v4.24c0 1.36-.69 2-2.22 2h-17.11v15.73h5.69V58h8.66l3.94 10.61h6.79s-4-10.73-4.13-11 1.68-.61 2.82-1.84 1.11-2.56 1.26-4.25z"
      />
      <path fill="url(#prefix__linear-gradient-2)" d="M0 430h725v8H0z" />
      <path
        transform="rotate(90 362.5 246)"
        fill="url(#prefix__linear-gradient-3)"
        d="M220.5-66h284v624h-284z"
      />
      <path fill="#fff" d="M52.5 106h620v280h-620z" />
      <foreignObject x="50" y="100" width="300" height="300">
        {qrcode}
      </foreignObject>
      <foreignObject x="395" y="110" width="270" height="100">
        <Grid container alignItems="center" height="100%">
          <Typography
            align="center"
            variant="subtitle1"
            sx={{ fontSize: 16, fontFamily: 'Roboto', width: '100%' }}
          >
            {title === '' || undefined ? 'Your title' : title}
          </Typography>
        </Grid>
      </foreignObject>
      <foreignObject x="395" y="210" width="270" height="170">
        <Grid container justifyContent="center" alignItems="center" height="100%" rowSpacing="1">
          <Grid item width="100%">
            <Typography
              align="center"
              variant="body1"
              sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
            >
              File name: {uploadedCid.name} | Size: {uploadedCid.size}Kb
            </Typography>
          </Grid>
          <Grid item width="90%">
            <Typography
              align="center"
              style={{ wordWrap: 'break-word' }}
              sx={{ fontSize: 14, fontFamily: 'Roboto', width: '100%' }}
            >
              {uploadedCid.cid}
            </Typography>
          </Grid>

          <Grid item width="100%">
            <Typography
              align="center"
              variant="body1"
              sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
            >
              This NFT is generated by smart contract
            </Typography>
            <Typography
              align="center"
              style={{ wordWrap: 'break-word' }}
              sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
            >
              0x77A80028A50a7504604646EE51586A721F52f07c
            </Typography>
          </Grid>
        </Grid>
      </foreignObject>
      <path
        className="prefix__cls-5"
        d="M346.5 184.21v6.14a.74.74 0 01-.23.53.72.72 0 01-.53.23.74.74 0 01-.54-.23.68.68 0 01-.23-.53v-2.29h-9v2.29a.77.77 0 01-.22.54.73.73 0 01-.54.22.74.74 0 01-.54-.23.71.71 0 01-.22-.53v-6.14a.73.73 0 01.22-.54.76.76 0 011.3.54v2.33h9v-2.33a.73.73 0 01.22-.54.77.77 0 01.53-.22.78.78 0 01.55.22.74.74 0 01.23.54zM346.5 200.93v3a2.1 2.1 0 01-.38 1.14 2.39 2.39 0 01-.89.82l-3 1.5a3.58 3.58 0 01-3.42 0l-3-1.51a2.3 2.3 0 01-.92-.83 2.2 2.2 0 01-.35-1.21v-2.9a.74.74 0 01.23-.54.75.75 0 01.53-.22.82.82 0 01.55.22.73.73 0 01.22.54v.8H345v-.78a.7.7 0 01.23-.54.73.73 0 01.54-.22.71.71 0 01.53.22.74.74 0 01.2.51zm-1.5 2.29h-9v.53a.8.8 0 00.5.76l3 1.5a2.31 2.31 0 001 .28 2.06 2.06 0 00.94-.22l3.08-1.56a.82.82 0 00.47-.79zM345 223.79v-5.37h-3.7v2.31a.75.75 0 01-.76.76.75.75 0 01-.55-.22.73.73 0 01-.22-.54v-2.31H336v5.38a.77.77 0 01-.22.54.73.73 0 01-.54.22.7.7 0 01-.54-.23.73.73 0 01-.22-.54v-6.89h12v6.89a.74.74 0 01-.23.54.73.73 0 01-.55.23.7.7 0 01-.53-.23.73.73 0 01-.17-.54zM345.72 241.26H334.5v-2l9.32-4.09h-8.56a.77.77 0 01-.54-.22.77.77 0 010-1.08.77.77 0 01.54-.22h11.24v2l-9.3 4.09h8.52a.77.77 0 110 1.54zM344.43 250.32h2.05V258h-2.07a.7.7 0 01-.53-.23.73.73 0 01-.22-.53.77.77 0 01.22-.55.74.74 0 01.53-.23h.59v-1.53h-9.71a.74.74 0 01-.54-.23.73.73 0 01-.22-.53.77.77 0 01.76-.78H345v-1.53h-.54a.73.73 0 01-.53-.22.75.75 0 010-1.08.69.69 0 01.5-.24zM346.5 267.8v6.14a.73.73 0 01-.23.52.68.68 0 01-.53.23.73.73 0 01-.54-.22.7.7 0 01-.23-.53v-2.3h-9v2.3a.76.76 0 01-1.52 0v-6.14a.76.76 0 011.3-.54.77.77 0 01.22.54v2.33h9v-2.33a.76.76 0 011.3-.54.74.74 0 01.23.54zM344.43 283.75h2.05v7.66h-2.07a.69.69 0 01-.53-.22.75.75 0 01-.22-.54.73.73 0 01.22-.54.7.7 0 01.53-.23h.59v-1.54h-9.71a.73.73 0 01-.54-.22.79.79 0 010-1.09.73.73 0 01.54-.22H345v-1.54h-.54a.69.69 0 01-.53-.22.74.74 0 01-.23-.54.79.79 0 01.76-.76zM340.26 305.09h-5a.75.75 0 01-.76-.75.78.78 0 01.22-.56.73.73 0 01.54-.22h5l3.87-3.05h1.6a.77.77 0 110 1.53h-1.05l-2.92 2.28 2.92 2.31h1.06a.73.73 0 01.54.22.76.76 0 01.23.54.77.77 0 01-.21.53.75.75 0 01-.57.23h-1.59z"
      />
      <path fill="url(#prefix__linear-gradient-4)" d="M480.79 210.77h100v.5h-100z" />
      <path fill="url(#prefix__linear-gradient-5)" d="M387.44 148.16h.5v200h-.5z" />
    </svg>
  );
}
export default SvgComponent;