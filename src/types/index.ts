export interface ProviderOptions {
  formaticKey: string;
  portisId: string;
  networkUrl: string;
  chainId: number;
}

export enum WalletProviderType {
  Portis = 'portist',
  Fortmatic = 'fortmatic',
  Metamask = 'metamask',
  Coinbase_Link = 'coinbase-link',
  Coinbase_Wallet = 'coinbase-wallet',
  Wallet_Connect = 'wallet-connect',
}

type Image = string;

type WalletType = 'web' | 'mobile';

export interface IWalletProvider {
  id: WalletProviderType;
  name: string;
  description?: string;
  type: WalletType;
  logo: Image;
  href: string | null;
  color: string;
  mobile?: boolean; // to review, taken from uniswap
  mobileOnly?: boolean; // to review, taken from uniswap
}
