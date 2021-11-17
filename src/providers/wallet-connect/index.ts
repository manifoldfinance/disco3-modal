import { WalletProviderType, IWalletProvider } from '../../types';

import WalletConnectLogo from './walletConnectIcon.svg';

export const WALLET_CONNECT: IWalletProvider = {
  id: WalletProviderType.Wallet_Connect,
  name: 'WalletConnect',
  logo: WalletConnectLogo,
  type: 'web',
  description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  href: null,
  color: '#4196FC',
  mobile: true,
};
