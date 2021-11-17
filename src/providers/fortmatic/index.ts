import { WalletProviderType, IWalletProvider } from '../../types';

import FortmaticLogo from './fortmaticIcon.svg';

export const FORTMATIC: IWalletProvider = {
  id: WalletProviderType.Fortmatic,
  name: 'Fortmatic',
  logo: FortmaticLogo,
  type: 'web',
  description: 'Login using Fortmatic hosted wallet',
  href: null,
  mobile: true,
  color: '#6748FF',
};
