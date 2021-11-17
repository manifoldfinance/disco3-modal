import React from 'react';

import { ModalWallet } from '../components/modal-wallet';

export default {
  title: 'Components/WalletModal',
  component: ModalWallet,
};

const ModalOpen: React.FC = () => {
  return <ModalWallet isOpen={true} onClose={() => console.log('on close')} />;
};

export { ModalOpen };
