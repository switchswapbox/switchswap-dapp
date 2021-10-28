import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRCardGeneralInfo } from 'reduxStore/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const iconNames = ['switchswap', 'crust'];
const srcArray = iconNames.map((iconName) => {
  return `./static/icons/shared/${iconName}.svg`;
});

const MidIconSelection = () => {
  const icon = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.icon || '';
  });
  const dispatch = useDispatch();
  const handleSelectMidIcon = (name: stringAndNumber) => {
    icon !== name
      ? dispatch(changeQRCardGeneralInfo({ icon: name as string }))
      : dispatch(changeQRCardGeneralInfo({ icon: '' }));
  };

  return (
    <ToggleButtonGroupScrollbar
      label="Icon"
      value={icon}
      nameArray={iconNames}
      srcArray={srcArray}
      handleSelect={handleSelectMidIcon}
      buttonDim="30px"
    />
  );
};

export default MidIconSelection;
