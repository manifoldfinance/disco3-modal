import React, { useContext, PropsWithChildren, useState, useEffect } from 'react';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Web3Provider } from '@ethersproject/providers';

import { ProviderOptions, WalletProviderType } from '../types';
import { getConnectors } from '../connectors';
import ThemeProvider from '../theme';

import { ModalWallet } from './modal-wallet';

interface IModalWalletProvider {
  showWalletModal: () => void;
  hideWalletModal: () => void;
  useWeb3React: () => Web3ReactContextInterface;
  connectors: Map<WalletProviderType, AbstractConnector>;
}

const ModalWalletContext = React.createContext<IModalWalletProvider>({
  showWalletModal: () => {} /* eslint-disable-line */,
  hideWalletModal: () => {} /* eslint-disable-line */,
  useWeb3React: useWeb3React,
  connectors: new Map<WalletProviderType, AbstractConnector>(),
});

interface ModalProviderOptionProps {
  options: ProviderOptions;
}

export const ModalWalletProvider: React.FC<PropsWithChildren<ModalProviderOptionProps>> = ({
  children,
  options,
}) => {
  const [isModalWalletOpen, setIsModalWalletOpen] = useState(false);

  const showWalletModal = () => {
    setIsModalWalletOpen(true);
  };

  const hideWalletModal = () => {
    setIsModalWalletOpen(false);
  };

  const connectors = getConnectors(options);

  const [context, setContext] = useState({
    showWalletModal: showWalletModal,
    hideWalletModal: hideWalletModal,
    useWeb3React: useWeb3React,
    connectors: connectors,
  });

  return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ModalWalletContext.Provider value={context}>
          {children}
          <ModalWallet isOpen={isModalWalletOpen} onClose={hideWalletModal} />
        </ModalWalletContext.Provider>
      </Web3ReactProvider>
    </ThemeProvider>
  );
};

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
};

export const getModalWalletContext = (): React.Context<IModalWalletProvider> => {
  return ModalWalletContext;
};

export const useWalletModal = () => {
  const walletContext = useContext(ModalWalletContext);

  if (walletContext === null) {
    throw new Error(
      'useWalletModal() can only be used inside of <ModalWalletProvider />, ' +
        'please declare it at a higher level.',
    );
  }
  return walletContext;
};
