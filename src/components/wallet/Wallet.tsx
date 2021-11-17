import React from 'react';
import styled from 'styled-components';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import ThemeProvider from '../../theme';

import { WalletProviderGrid } from './WalletProviderGrid';

export interface IWalletProps {
  trigger: () => void;
  testId: string;
}

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`;

interface ModalErrorProps {
  error: Error;
}

const ModalErrorView: React.FC<ModalErrorProps> = ({ error }) => {
  return (
    <React.Fragment>
      {error instanceof UnsupportedChainIdError ? (
        <h5>Please connect to the appropriate Ethereum network.</h5>
      ) : (
        'Error connecting. Try refreshing the page.'
      )}
    </React.Fragment>
  );
};

export const Wallet = () => {
  const { error } = useWeb3React();

  return (
    <ThemeProvider>
      <ContentWrapper className="web3-wallet-main-wrapper">
        {error && <ModalErrorView error={error} />}
        {!error && <WalletProviderGrid />}
      </ContentWrapper>
    </ThemeProvider>
  );
};
