import { WalletProviderType, IWalletProvider } from '../../types';

import MetamaskLogo from './metamaskIcon.svg';

export const METAMASK: IWalletProvider = {
  id: WalletProviderType.Metamask,
  name: 'Metamask',
  logo: MetamaskLogo,
  type: 'web',
  description: 'Easy-to-use browser extension.',
  href: null,
  color: '#E8831D',
};
