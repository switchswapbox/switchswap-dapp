import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRCardGeneralInfo, qrStyleNameType } from 'reduxStore/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const qrStyleNames = ['qrNormal', 'qrRandRect', 'qrDsj', 'qr25D', 'qrBubble', 'qrFunc', 'qrLine'];
const srcArray = qrStyleNames.map((qrStyleName) => {
  return `./static/mock-images/qr-style/${qrStyleName}.png`;
});

const QRStyleSelection = () => {
  const qrStyleName = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.qrStyleName || '';
  });
  const dispatch = useDispatch();
  const handleSelectQRStyle = (name: stringAndNumber) => {
    if (qrStyleName !== name) {
      dispatch(changeQRCardGeneralInfo({ qrStyleName: name as qrStyleNameType }));
    }
  };

  return (
    <ToggleButtonGroupScrollbar
      label="QR Code Style"
      value={qrStyleName}
      nameArray={qrStyleNames}
      srcArray={srcArray}
      handleSelect={handleSelectQRStyle}
      buttonDim="50px"
    />
  );
};

export default QRStyleSelection;
