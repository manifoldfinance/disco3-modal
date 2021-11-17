import React from 'react';

import { METAMASK, PORTIS, FORTMATIC } from '../providers';
import { WalletProvider } from '../components/wallet';

export default {
  title: 'Components/WalletProvider',
  component: WalletProvider,
  parameters: {
    icon: METAMASK.logo,
    header: METAMASK.name,
    color: METAMASK.color,
    subheader: '',
    id: METAMASK.id,
  },
};

export const Metamask = () => (
  <WalletProvider
    icon={METAMASK.logo}
    header={METAMASK.name}
    subheader=""
    color={METAMASK.color}
    id={METAMASK.id}
  />
);

export const Formatic = () => (
  <WalletProvider
    icon={FORTMATIC.logo}
    header={FORTMATIC.name}
    color={FORTMATIC.color}
    subheader=""
    id={FORTMATIC.id}
  />
);

export const Portis = () => (
  <WalletProvider
    icon={PORTIS.logo}
    header={PORTIS.name}
    color={PORTIS.color}
    subheader=""
    id={PORTIS.id}
  />
);

export const Active = () => (
  <WalletProvider
    icon={PORTIS.logo}
    header={PORTIS.name}
    color={PORTIS.color}
    subheader=""
    active={true}
    id={PORTIS.id}
  />
);
