import { Box } from '@mui/system';
import { NftCardsDesign } from 'components/_dashboard/nftMinting/NftCardsDesign';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';

function NftCardDownload() {
  const title = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.title;
  });
  const download = function (href: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
  };

  useEffect(() => {
    html2canvas(document.body, {
      foreignObjectRendering: true
    })
      .then(function (canvas) {
        let png = canvas.toDataURL(); // default png
        download(png, `${title}.png`);
        window.opener = null;
        window.open('', '_self');
        window.close();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <NftCardsDesign />
    </Box>
  );
}

export default NftCardDownload;
