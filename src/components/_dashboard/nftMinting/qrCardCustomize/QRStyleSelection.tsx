import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import {
  changeQRCardGeneralInfo,
  initialQRCard,
  qrStyleNameType
} from 'redux/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const qrStyleNames = ['qrNormal', 'qrRandRect', 'qrDsj', 'qr25D', 'qrBubble', 'qrFunc', 'qrLine'];
const srcArray = qrStyleNames.map((qrStyleName) => {
  return `./static/mock-images/qr-style/${qrStyleName}.svg`;
});

const QRStyleSelection = () => {
  const { qrStyleName, changeQRFile, qrStyleNameAuthorRegister } = useSelector(
    (state: RootState) => {
      return {
        qrStyleName:
          state.reducerCustomizeQRCard.qrStyleName ||
          (initialQRCard.qrStyleName as qrStyleNameType),
        qrStyleNameAuthorRegister:
          state.reducerCustomizeQRCard.qrStyleNameAuthorRegister ||
          (initialQRCard.qrStyleNameAuthorRegister as qrStyleNameType),
        changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
      };
    }
  );
  const dispatch = useDispatch();
  const handleSelectQRStyle = (name: stringAndNumber) => {
    if (changeQRFile) {
      if (qrStyleName !== name) {
        dispatch(changeQRCardGeneralInfo({ qrStyleName: name as qrStyleNameType }));
      }
    } else {
      if (qrStyleNameAuthorRegister !== name) {
        dispatch(changeQRCardGeneralInfo({ qrStyleNameAuthorRegister: name as qrStyleNameType }));
      }
    }
  };

  return (
    <ToggleButtonGroupScrollbar
      label="QR Code Style"
      value={changeQRFile ? qrStyleName : qrStyleNameAuthorRegister}
      nameArray={qrStyleNames}
      srcArray={srcArray}
      handleSelect={handleSelectQRStyle}
      buttonDim="50px"
    />
  );
};

export default QRStyleSelection;
