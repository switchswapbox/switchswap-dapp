import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changeQRCardGeneralInfo } from 'redux/reducerCustomizeQRCard';
import { initialMintingProcessState } from 'redux/reducerMintingProcess';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';

const LayoutSelection = () => {
  const { layout, nftType } = useSelector((state: RootState) => {
    return {
      layout: state.reducerCustomizeQRCard.layout || 0,
      nftType: state.reducerMintingProcess.nftType || (initialMintingProcessState.nftType as string)
    };
  });

  const layoutIndexes = nftType === 'simplified' ? [0, 1, 2, 3] : [4, 5, 6, 7];
  const srcArray = layoutIndexes.map((layoutIndex) => {
    return `./static/mock-images/nft-style/${layoutIndex}.svg`;
  });

  const dispatch = useDispatch();
  const handleSelect = (name: stringAndNumber) => {
    dispatch(changeQRCardGeneralInfo({ layout: name as number }));
  };

  return (
    <ToggleButtonGroupScrollbar
      label=""
      value={layout}
      nameArray={layoutIndexes}
      srcArray={srcArray}
      handleSelect={handleSelect}
      buttonDim="80px"
      sx={{ '& .simplebar-content': { display: { sm: 'flex' }, justifyContent: { sm: 'center' } } }}
    />
  );
};

export default LayoutSelection;
