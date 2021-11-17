import { Modal } from '../../src/components/modal-wallet/Modal';

describe('Modal tests', () => {
  test('it works', () => {
    expect(Modal).toMatchSnapshot();
  });
});
