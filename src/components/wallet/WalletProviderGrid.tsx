import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';

import styled from 'styled-components';

import { getAllWalletProviders } from '../../providers';

import { WalletProvider } from './WalletProvider';
import { useWalletModal } from '../useModalWalletProvider';
import { IWalletProvider, WalletProviderType } from '../../types';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export const WalletProviderGrid: React.FC<{}> = () => {
  const { active, account, connector, activate, error } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    console.log('Calling try activation');
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    // if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
    //   connector.walletConnectProvider = undefined
    // }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      });
  };
  const { connectors } = useWalletModal();

  const getWalletProviderComponents = () => {
    const isMetamask = (window as any).ethereum && (window as any).ethereum.isMetaMask; // TODO: Review metamask documentation
    console.log('isMetamask', isMetamask);

    return getAllWalletProviders().map((item: IWalletProvider) => {
      const currentWalletConnector = connectors.get(item.id);

      if (isMobile) {
        //disable portis on mobile for now
        if (item.id === WalletProviderType.Portis) {
          return null;
        }

        if (!(window as any).web3 && !(window as any).ethereum && item.mobile) {
          return (
            <WalletProvider
              active={currentWalletConnector && currentWalletConnector === connector}
              id={`connect-${item.id}`}
              key={item.id}
              icon={item.logo}
              color={item.color}
              header={item.name}
              subheader={null}
              href={item.href}
              onClick={() => {
                currentWalletConnector !== connector &&
                  !item.href &&
                  tryActivation(currentWalletConnector);
              }}
            />
          );
        }
        return null;
      }

      if (item.id === WalletProviderType.Metamask) {
        //  don't show injected if there's no injected provider
        if (!((window as any).web3 || (window as any).ethereum)) {
          if (item.name === 'MetaMask') {
            return (
              <WalletProvider
                id={`connect-${item.id}`}
                key={item.id}
                icon={item.logo}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                href={'https://metamask.io/'}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (item.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (item.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      return (
        !isMobile &&
        !item.mobileOnly && (
          <WalletProvider
            key={item.id}
            id={item.id}
            icon={item.logo}
            header={item.name}
            subheader=""
            href={item.href}
            color={item.color}
            active={currentWalletConnector === connector}
            onClick={() => {
              currentWalletConnector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !item.href && tryActivation(currentWalletConnector);
            }}
          />
        )
      );
    });
  };

  return (
    <Wrapper className="web3-wallet-wrapper">
      <OptionGrid>{getWalletProviderComponents()}</OptionGrid>
    </Wrapper>
  );
};
