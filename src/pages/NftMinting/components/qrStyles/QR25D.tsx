import { RendererWrapper, RendererProps, SFC, getTypeTable, QRPointType } from 'react-qrbtf';
import QRCode from 'react-qrbtf/dist/utils/qrcode';

const X = [Math.sqrt(3) / 2, 1 / 2];
const Y = [-Math.sqrt(3) / 2, 1 / 2];
const Z = [0, 0];

const matrixString =
  'matrix(' +
  String(X[0]) +
  ', ' +
  String(X[1]) +
  ', ' +
  String(Y[0]) +
  ', ' +
  String(Y[1]) +
  ', ' +
  String(Z[0]) +
  ', ' +
  String(Z[1]) +
  ')';

interface QR25DProps extends RendererProps {
  height?: number;
  posHeight?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
}

const QR25D: SFC<QR25DProps> = (props) => {
  const { qrcode, className, styles } = props;
  return (
    <svg
      className={className}
      style={styles.svg}
      width="100%"
      height="100%"
      viewBox={getViewBox(qrcode)}
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {listPoints(props)}
      {drawIcon(props)}
    </svg>
  );
};

function getViewBox(qrcode: QRCode | undefined) {
  if (!qrcode) return '0 0 0 0';

  const nCount = qrcode.getModuleCount();
  return (
    String(-nCount) +
    ' ' +
    String(-nCount / 2) +
    ' ' +
    String(nCount * 2) +
    ' ' +
    String(nCount * 2)
  );
}

function listPoints({ qrcode, height, posHeight, topColor, leftColor, rightColor }: QR25DProps) {
  if (!qrcode) return [];

  const nCount = qrcode.getModuleCount();
  const typeTable = getTypeTable(qrcode);
  const pointList = new Array(nCount);

  let size = 1.001;
  let size2 = 1.001;
  height = height!;
  posHeight = posHeight!;
  topColor = topColor!;
  leftColor = leftColor!;
  rightColor = rightColor!;

  let id = 0;

  if (height <= 0) height = 1.0;
  if (posHeight <= 0) posHeight = 1.0;

  for (let x = 0; x < nCount; x++) {
    for (let y = 0; y < nCount; y++) {
      if (qrcode.isDark(x, y) === false) continue;
      else if (
        typeTable[x][y] === QRPointType.POS_OTHER ||
        typeTable[x][y] === QRPointType.POS_CENTER
      ) {
        pointList.push(
          <rect
            width={size2}
            height={size2}
            key={id++}
            fill={topColor}
            x={x + (1 - size2) / 2}
            y={y + (1 - size2) / 2}
            transform={matrixString}
          />
        );
        pointList.push(
          <rect
            width={posHeight}
            height={size2}
            key={id++}
            fill={leftColor}
            x={0}
            y={0}
            transform={
              matrixString +
              'translate(' +
              String(x + (1 - size2) / 2 + size2) +
              ',' +
              String(y + (1 - size2) / 2) +
              ') skewY(45) '
            }
          />
        );
        pointList.push(
          <rect
            width={size2}
            height={posHeight}
            key={id++}
            fill={rightColor}
            x={0}
            y={0}
            transform={
              matrixString +
              'translate(' +
              String(x + (1 - size2) / 2) +
              ',' +
              String(y + size2 + (1 - size2) / 2) +
              ') skewX(45) '
            }
          />
        );
      } else {
        pointList.push(
          <rect
            width={size}
            height={size}
            key={id++}
            fill={topColor}
            x={x + (1 - size) / 2}
            y={y + (1 - size) / 2}
            transform={matrixString}
          />
        );
        pointList.push(
          <rect
            width={height}
            height={size}
            key={id++}
            fill={leftColor}
            x={0}
            y={0}
            transform={
              matrixString +
              'translate(' +
              String(x + (1 - size) / 2 + size) +
              ',' +
              String(y + (1 - size) / 2) +
              ') skewY(45) '
            }
          />
        );
        pointList.push(
          <rect
            width={size}
            height={height}
            key={id++}
            fill={rightColor}
            x={0}
            y={0}
            transform={
              matrixString +
              'translate(' +
              String(x + (1 - size) / 2) +
              ',' +
              String(y + size + (1 - size) / 2) +
              ') skewX(45) '
            }
          />
        );
      }
    }
  }

  return pointList;
}

export function drawIcon({
  qrcode,
  title,
  titleSize,
  titleColor,
  titleAlign,
  icon,
  iconScale = 0.33,
  styles
}: RendererProps) {
  if (!qrcode) return [];
  if (!title && !icon) return null;

  const nCount = qrcode.getModuleCount();
  const { fontSize, color, verticalAlign, ...titleStyle } = styles.title || {};
  const titleVerticalAlign = titleAlign || verticalAlign || (icon ? 'bottom' : 'middle');
  const sq25 =
    'M32.048565,-1.29480038e-15 L67.951435,1.29480038e-15 C79.0954192,-7.52316311e-16 83.1364972,1.16032014 87.2105713,3.3391588 C91.2846454,5.51799746 94.4820025,8.71535463 96.6608412,12.7894287 C98.8396799,16.8635028 100,20.9045808 100,32.048565 L100,67.951435 C100,79.0954192 98.8396799,83.1364972 96.6608412,87.2105713 C94.4820025,91.2846454 91.2846454,94.4820025 87.2105713,96.6608412 C83.1364972,98.8396799 79.0954192,100 67.951435,100 L32.048565,100 C20.9045808,100 16.8635028,98.8396799 12.7894287,96.6608412 C8.71535463,94.4820025 5.51799746,91.2846454 3.3391588,87.2105713 C1.16032014,83.1364972 5.01544207e-16,79.0954192 -8.63200256e-16,67.951435 L8.63200256e-16,32.048565 C-5.01544207e-16,20.9045808 1.16032014,16.8635028 3.3391588,12.7894287 C5.51799746,8.71535463 8.71535463,5.51799746 12.7894287,3.3391588 C16.8635028,1.16032014 20.9045808,7.52316311e-16 32.048565,-1.29480038e-15 Z';

  iconScale = iconScale > 0.33 ? 0.33 : iconScale;
  const iconSize = Number(nCount * iconScale);
  const iconXY = (nCount - iconSize) / 2;
  console.log(iconXY);

  const pointList = [];
  pointList.push(
    <g transform={matrixString}>
      <path
        d={sq25}
        stroke="#FFF"
        strokeWidth={(100 / iconSize) * 1}
        fill="#FFF"
        transform={
          'translate(' +
          String(iconXY) +
          ',' +
          String(iconXY) +
          ') ' +
          'scale(' +
          String(iconSize / 100) +
          ',' +
          String(iconSize / 100) +
          ')'
        }
      />
    </g>
  );
  pointList.push(
    <g key={1} transform={matrixString}>
      <defs>
        <path
          id={'defs-path0'}
          d={sq25}
          fill="#FFF"
          transform={
            'translate(' +
            String(iconXY) +
            'px,' +
            String(iconXY) +
            'px) ' +
            'scale(' +
            String(iconSize / 100) +
            ',' +
            String(iconSize / 100) +
            ') '
          }
        />{' '}
      </defs>
      <clipPath id={'clip-path1'}>
        <use xlinkHref={'#defs-path0'} overflow="visible" />
      </clipPath>
      <g clipPath={'url(#clip-path1)'}>
        <g
          transform={
            'translate(' +
            String(iconXY) +
            'px,' +
            String(iconXY) +
            'px) ' +
            'scale(' +
            String(iconSize / 100) +
            ',' +
            String(iconSize / 100) +
            ') '
          }
        >
          <image key={2} xlinkHref={icon} width={iconSize - 2} x={iconXY + 1} y={iconXY + 1} />
        </g>
      </g>
    </g>
  );

  if (title) {
    const svgWidth = styles.svg && styles.svg.width ? styles.svg.width.replace('px', '') : 300;
    const titleFontSize =
      (Number(nCount + (nCount / 5) * 2) * (titleSize || fontSize || 12)) / svgWidth;
    const titleFontColor = titleColor || color || '#000000';

    const fontY =
      titleVerticalAlign === 'middle'
        ? icon
          ? iconXY + iconSize
          : nCount / 2 + titleFontSize * 0.5
        : Number(nCount + nCount / 5) - titleFontSize * 0.5;

    pointList.push(
      <text
        key={3}
        x={nCount / 2}
        y={fontY}
        fill={titleFontColor}
        style={{ ...titleStyle, fontSize: titleFontSize }}
        textAnchor="middle"
      >
        {title}
      </text>
    );
  }

  return pointList;
}

QR25D.defaultCSS = {
  svg: {}
};

QR25D.defaultProps = {
  height: 0.5,
  posHeight: 0.5,
  topColor: '#FF7F89',
  leftColor: '#FFD7D9',
  rightColor: '#FFEBF3'
};

export default RendererWrapper(QR25D);
