import { InjectedConnector } from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { ProviderOptions, WalletProviderType } from '../types';

import { FortmaticConnector } from './Fortmatic';

enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  Ropsten = 3,
}

// TODO: This part should be removed maybe?
// import { Web3Provider } from '@ethersproject/providers'
// import { NetworkConnector } from './NetworkConnector'
// let networkLibrary: Web3Provider | undefined
// const getNetworkLibrary = (): Web3Provider => {
//     return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
// }
// const network = new NetworkConnector({
//     urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
// })

export const getConnectors = (
  options: ProviderOptions,
): Map<WalletProviderType, AbstractConnector> => {
  const { formaticKey, portisId, networkUrl, chainId } = options;

  const connectorsMapResult = new Map<WalletProviderType, AbstractConnector>();

  const NETWORK_URL = networkUrl;
  const NETWORK_CHAIN_ID: number = chainId;

  if (typeof NETWORK_URL === 'undefined') {
    throw new Error(`network url must be defined`);
  }

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [ChainId.Mainnet, ChainId.Goerli],
  });

  // mainnet only
  const fortmaticConnector = new FortmaticConnector({
    apiKey: formaticKey ?? '',
    chainId: NETWORK_CHAIN_ID,
  });

  // mainnet only
  const portisConnector = new PortisConnector({
    dAppId: portisId ?? '',
    networks: [NETWORK_CHAIN_ID],
  });

  // mainnet only
  const walletconnectConnector = new WalletConnectConnector({
    rpc: { 1: NETWORK_URL },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000,
  });

  // mainnet only
  const walletlinkConnector = new WalletLinkConnector({
    url: NETWORK_URL,
    appName: 'Codefi Staking',
    appLogoUrl:
      'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
  });

  // set map of connectors
  connectorsMapResult.set(WalletProviderType.Fortmatic, fortmaticConnector);
  connectorsMapResult.set(WalletProviderType.Portis, portisConnector);
  connectorsMapResult.set(WalletProviderType.Wallet_Connect, walletconnectConnector);
  connectorsMapResult.set(WalletProviderType.Coinbase_Link, walletlinkConnector);
  connectorsMapResult.set(WalletProviderType.Coinbase_Wallet, walletlinkConnector);
  connectorsMapResult.set(WalletProviderType.Metamask, injectedConnector);
  return connectorsMapResult;
};
