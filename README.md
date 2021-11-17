# @disco3/modal

> @disco3/modal - wallet & modal kit


This is a Wrapper around Web3 React / Disco3

Provides react hooks that extend web3-react functionality and provide custom hooks to add modal wallet and wallet connections.

### Hooks

Same as Web3 React but we include an additional hook:

- useModalWallet
- useWallet

#### Example:

In order to make it work you need to wrap your components with the Web3WalletProvider

### Configuration

The @disco3/modal exposes a ProviderOptions interface.

```js
const options: ProviderOptions = {
    formaticKey: "XX",
    portisId: "XX",
    networkUrl: "XX",
    chainId: "1"
}

 <ModalWalletProvider options={options}>
    // components
  </ModalWalletProvider>
```

### Getting Started

```sh
> yarn add @disco3/react-modal
```

