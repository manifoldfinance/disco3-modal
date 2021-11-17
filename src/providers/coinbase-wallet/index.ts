import { WalletProviderType, IWalletProvider } from '../../types';

import CoinbaseWalletLogo from './coinbaseWalletIcon.svg';

export const COINBASE_WALLET: IWalletProvider = {
  id: WalletProviderType.Coinbase_Wallet,
  name: 'Coinbase Wallet',
  logo: CoinbaseWalletLogo,
  type: 'web',
  description: 'Use Coinbase Wallet app on mobile device',
  href: null,
  color: '#315CF5',
};

export const COINBASE_LINK: IWalletProvider = {
  id: WalletProviderType.Coinbase_Link,
  name: 'Open in Coinbase Wallet',
  logo: CoinbaseWalletLogo,
  description: 'Open in Coinbase Wallet app.',
  href: 'https://go.cb-w.com/mtUDhEZPy1',
  mobile: true,
  type: 'mobile',
  mobileOnly: true,
  color: '#315CF5',
};
