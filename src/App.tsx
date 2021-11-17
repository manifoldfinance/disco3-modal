import React from 'react';
import ReactDom from 'react-dom';

import { ModalWalletProvider, useWalletModal } from './components';
import { ProviderOptions } from './types';

const App: React.FC = () => {
  const { showWalletModal } = useWalletModal();

  return (
    <React.Fragment>
      <button
        onClick={() => {
          showWalletModal();
        }}
      >
        Connect to a wallet
      </button>
    </React.Fragment>
  );
};

const options: ProviderOptions = {
  formaticKey: process.env.REACT_APP_FORTMATIC_KEY,
  portisId: process.env.REACT_APP_PORTIS_ID,
  networkUrl: process.env.REACT_APP_NETWORK_URL,
  chainId: parseInt(process.env.REACT_APP_CHAIN_ID, 10),
};

ReactDom.render(
  <ModalWalletProvider options={options}>
    <App />
  </ModalWalletProvider>,
  document.getElementById('root'),
);
