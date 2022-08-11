import './navbar.css'

export function mountNavbar(element) {
  element.innerHTML = `
<nav class="navbar is-fixed-top">
<div class="container">
    <div class="navbar-brand">
        <a class="navbar-item" href="../">
            <img src="/signum-logo.svg" width="128" alt="Logo">
        </a>
        <span class="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
        </span>
    </div>
    <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
            <div class="tabs is-right">
<!--                <ul>-->
<!--                    <li class="is-active"><a>Home</a></li>-->
<!--                    <li><a href="">Examples</a></li>-->
<!--                    <li><a href="">Features</a></li>-->
<!--                    <li><a href="">Team</a></li>-->
<!--                    <li><a href="">Help</a></li>-->
<!--                </ul>-->
                <span class="navbar-item">
                    <button id="connect-button" class="button is-white is-outlined">
                        <div id="connect-button-icon">
                          <span class="icon">
                              <i class="fa fa-plug"></i>
                          </span>
                          <img src="" class="is-hidden hashicon" height="32" width="32" alt=""/>
                        </div>
                        <span id="connect-button-text">Connect Wallet</span>
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>
</nav>
   `
  const connectButton = document.getElementById("connect-button");

  connectButton.addEventListener('click', () => {
    window.dispatchEvent(new Event(!window.walletConnection ? "wallet-connect" : "wallet-disconnect"));
  })

  window.addEventListener('wallet-event', (event) => {
    console.debug(event.detail)
    const {payload, action} = event.detail
    if (action === 'connected') {
      document.getElementById('connect-button-text').innerText = payload.address
      document.querySelector('#connect-button-icon span').classList.add('is-hidden');
      const avatar = document.querySelector('#connect-button-icon img')
      avatar.src = window.hashicon(payload.accountId, 32).toDataURL()
      avatar.classList.remove('is-hidden');
    }else if(action=== 'disconnected'){
      document.getElementById('connect-button-text').innerText = 'Connect Wallet'
      document.querySelector('#connect-button-icon span').classList.remove('is-hidden');

      const avatar = document.querySelector('#connect-button-icon img')
      avatar.src = ""
      avatar.classList.add('is-hidden');
    }
  })

}

