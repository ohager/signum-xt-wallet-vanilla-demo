export function mountBody(element) {
  element.innerHTML = `
<div class="hero-body">
    <div class="container has-text-centered">
    
    <h1 class="title">
        Click <em>Connect Wallet</em> to connect to XT Wallet
    </h1>
    <h2 class="subtitle">
        Get XT wallet for <a class="is-underlined" href="https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib" rel="noreferrer noopener" target="_blank">Google Chrome</a> or <a class="is-underlined" href="https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/" rel="noreferrer noopener" target="_blank">Mozilla Firefox</a> 
    </h2>

    <div id="successful-connection" class="card">
      <div class="card-content">
        <p class="is-size-3">
          Congratulations. You are connected with the wallet 🎉
        </p>
        <p id="account-connection" class="is-size-4 mt-2 is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
          <img class="mr-2" src="" height="64" width="64" alt="">
          <span></span>
        </p>
        <small>Connected to:</small>
        <p id="network" class="is-size-4 my-2">
        </p>
        <button id="send-button" class="button is-success is-size-5">
            Send Message
        </button>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
            <button id="disconnect-button" class="button is-outlined">Disconnect</button>
        </p>
      </footer>
    </div>
  </div>
</div>
   `

  const connectButton = document.getElementById("disconnect-button");
  connectButton.addEventListener('click', () => {
    window.dispatchEvent(new Event("wallet-disconnect"));
  })


  window.addEventListener('wallet-event', (event) => {
    const {payload, action} = event.detail

    if (action === 'connected') {
      document.querySelector('#account-connection span').innerText = payload.address
      const avatar = document.querySelector('#account-connection img')
      avatar.src = window.hashicon(payload.accountId, 64).toDataURL()
      document.getElementById('successful-connection').classList.remove("is-hidden")
      document.getElementById('network').innerText = payload.host;
    }

    if (action === 'disconnected') {
      document.getElementById('successful-connection').classList.add("is-hidden")
      document.getElementById('connect-button-text').innerText = 'Connect Wallet'
      document.querySelector('#connect-button-icon span').classList.remove('is-hidden');
      const avatar = document.querySelector('#connect-button-icon img')
      avatar.src = ""
      avatar.classList.add('is-hidden');
    }

  })
}
