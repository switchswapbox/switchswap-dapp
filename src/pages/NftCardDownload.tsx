import { Box } from '@mui/system';
import { NftCardsDesign } from 'components/_dashboard/nftMinting/NftCardsDesign';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';

function NftCardDownload() {
  const state = useSelector((state: IRootState) => {
    return state;
  });
  var download = function (href: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
    link.remove();
  };

  useEffect(() => {
    html2canvas(document.body, {
      foreignObjectRendering: true,
      logging: false
    })
      .then(function (canvas) {
        let png = canvas.toDataURL(); // default png
        // download(png, 'nft.png');

        // window.opener = null;
        // window.open('', '_self');
        // window.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <NftCardsDesign />
    </Box>
  );
}

export default NftCardDownload;
