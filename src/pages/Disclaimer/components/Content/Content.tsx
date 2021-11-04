import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useLocales from 'hooks/useLocales';

export default function Content() {
  return (
    <Box>
      <Typography component={'p'} color={'text.secondary'}>
        Switchswap is a decentralized peer-to-peer protocol that people can use to create and trade
        Nfts using Crust network Storage and Multi blockchain such as Polygon, Binance smart chain,
        Skale network. There are three versions of the Uniswap protocol (v1, v2, and v3), each of
        which is made up of free, public, open-source or source-available software including a set
        of smart contracts that are deployed on the Ethereum Blockchain. Your use of the Switchswap
        protocol involves various risks, including, but not limited to, losses while digital assets
        are being supplied to the Switchswap protocol and losses due to the fluctuation of prices of
        Nfts in a trading pair or liquidity pool. Before using the Switchswap protocol, you should
        review the relevant documentation to make sure you understand how the Switchswap protocol
        works. Additionally, just as you can access email email protocols such as SMTP through
        multiple email clients, you can access the Switchswap protocol through dozens of web or
        mobile interfaces. You are responsible for doing your own diligence on those interfaces to
        understand the fees and risks they present.<br></br>
        <br></br>
        AS DESCRIBED IN THE SWITCHSWAP PROTOCOL LICENSES, THE SWITCHSWAP PROTOCOL IS PROVIDED ”AS
        IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. Although Universal Navigation
        Inc. d/b/a/ ”Switchswap Labs” ( ”Switchswap Labs” ) developed much of the initial code for
        the Switchswap protocol, it does not provide, own, or control the Switchswap protocol, which
        is run by smart contracts deployed on the multi blockchains. Upgrades and modifications to
        the protocol are managed in a community-driven way by holders of the SSP governance token.
        No developer or entity involved in creating the Switchswap protocol will be liable for any
        claims or damages whatsoever associated with your use, inability to use, or your interaction
        with other users of, the Switchswap protocol, including any direct, indirect, incidental,
        special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies,
        tokens, or anything else of value.
      </Typography>
    </Box>
  );
}
