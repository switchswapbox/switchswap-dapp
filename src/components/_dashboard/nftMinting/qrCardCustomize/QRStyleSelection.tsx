import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import {
  changeQRCardGeneralInfo,
  initialQRCard,
  qrStyleNameType
} from 'reduxStore/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const qrStyleNames = ['qrNormal', 'qrRandRect', 'qrDsj', 'qr25D', 'qrBubble', 'qrFunc', 'qrLine'];
const srcArray = qrStyleNames.map((qrStyleName) => {
  return `./static/mock-images/qr-style/${qrStyleName}.svg`;
});

const QRStyleSelection = () => {
  const { qrStyleName, changeQRFile, qrStyleNameAuthorRegister } = useSelector(
    (state: IRootState) => {
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
    if (qrStyleName !== name) {
      changeQRFile
        ? dispatch(changeQRCardGeneralInfo({ qrStyleName: name as qrStyleNameType }))
        : dispatch(changeQRCardGeneralInfo({ qrStyleNameAuthorRegister: name as qrStyleNameType }));
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
