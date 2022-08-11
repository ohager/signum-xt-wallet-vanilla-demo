/*
As we use vite here, it would be even better to import the wallet as module.
But for demonstration purposes we use the plan html usage here.
This helps non-vite vanilla projects on migration
 */

let walletListener = null;
const Networks = {
  MainNet: 'Signum',
  TestNet: 'Signum-TESTNET'
}

window.wallet = new sig$wallets.GenericExtensionWallet()
window.walletConnection = null
window.network = Networks.TestNet

function dispatchWalletEvent(action, data){
  window.dispatchEvent(new CustomEvent('wallet-event', {detail: {
    action,
      payload: {...data}
    }}))
}

function onNetworkChange(args) {
  dispatchWalletEvent('networkChanged', {...args})
  if (args.networkName === window.network) {
    if (!window.walletConnection) {
      window.dispatchEvent(new Event("wallet-connect"));
    }
  } else {
    alert("Wallet changed to another network")
  }
}

function onAccountChange(args) {
  dispatchWalletEvent('accountChanged', {...args})
}

function onPermissionOrAccountRemoval() {
  dispatchWalletEvent('permissionRemoved', {...args})
  alert("Wallet removed this DApps permission")
  handleDisconnectWallet();
}

async function handleConnectWallet(appName) {
  if (window.walletConnection) return;

  try {
    const connection = await window.wallet.connect({
      appName,
      networkName: Networks.TestNet
    })

    if (walletListener) {
      walletListener.unlisten();
    }

    walletListener = connection.listen({
      onNetworkChanged: onNetworkChange,
      onAccountChanged: onAccountChange,
      onPermissionRemoved: onPermissionOrAccountRemoval,
      onAccountRemoved: onPermissionOrAccountRemoval,
    });

    connection.address = sig$.Address.fromPublicKey(connection.publicKey, network === Networks.MainNet ? 'S' : 'TS').getReedSolomonAddress()
    window.walletConnection = connection;
    dispatchWalletEvent('connected', {
      accountId: connection.accountId,
      publicKey: connection.publicKey,
      address: connection.address,
      host: connection.currentNodeHost
    })
  } catch (e) {
    alert(e.message)
  }
}

async function handleDisconnectWallet() {
  window.wallet = new sig$wallets.GenericExtensionWallet();
  window.walletConnection = null;
  dispatchWalletEvent('disconnected')
  walletListener.unlisten();
}

export async function initWallet(appName) {
  window.addEventListener("wallet-connect", handleConnectWallet.bind(null, appName));
  window.addEventListener("wallet-disconnect", handleDisconnectWallet);
}

initWallet('My Super App')
