import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRCardGeneralInfo, initialQRCard } from 'reduxStore/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const iconNames = ['switchswap', 'crust'];
const srcArray = iconNames.map((iconName) => {
  return `./static/icons/shared/${iconName}.svg`;
});

const MidIconSelection = () => {
  const { icon, iconAuthorRegister, changeQRFile } = useSelector((state: IRootState) => {
    return {
      icon: (state.reducerCustomizeQRCard.icon || initialQRCard.icon) as string,
      iconAuthorRegister: (state.reducerCustomizeQRCard.iconAuthorRegister ||
        initialQRCard.iconAuthorRegister) as string,
      changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
    };
  });
  console.log(iconAuthorRegister);
  const dispatch = useDispatch();
  const handleSelectMidIcon = (name: stringAndNumber) => {
    if (changeQRFile) {
      icon !== name
        ? dispatch(changeQRCardGeneralInfo({ icon: name as string }))
        : dispatch(changeQRCardGeneralInfo({ icon: '' }));
    } else {
      iconAuthorRegister !== name
        ? dispatch(changeQRCardGeneralInfo({ iconAuthorRegister: name as string }))
        : dispatch(changeQRCardGeneralInfo({ iconAuthorRegister: '' }));
    }
  };

  return (
    <ToggleButtonGroupScrollbar
      label="Icon"
      value={changeQRFile ? icon : iconAuthorRegister}
      nameArray={iconNames}
      srcArray={srcArray}
      handleSelect={handleSelectMidIcon}
      buttonDim="50px"
    />
  );
};

export default MidIconSelection;
