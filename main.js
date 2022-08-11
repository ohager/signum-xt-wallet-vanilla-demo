import './style.css'
import {mountNavbar} from './src/navbar'
import {mountBody} from './src/body'
import {mountMore} from './src/more'

document.querySelector('#app').innerHTML = `
 <section class="hero is-info is-medium is-bold">
    <div class="hero-head">
        <div id="navbar"/>
    </div>
    <div class="hero-body">
    <div id="body"/>
    </div>
 </section>
  <div class="box cta">
      <p class="has-text-centered">
          <span class="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
  </div>
  <section class="container">
  <div id="more"/>
  </section>
`

mountNavbar(document.querySelector('#navbar'))
mountBody(document.querySelector('#body'))
// next is just for you to build more.
mountMore(document.querySelector('#more'))
