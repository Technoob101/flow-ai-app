import React from 'react'
import './Nav.css'

function Nav() {
  return (
    <nav className='navBar'>   
      <button className='navButton'>
        <img src={chrome.runtime.getURL("src/assets/menu.png")} alt="menu" />
      </button>
      <button className='navButton'>
        <img src={chrome.runtime.getURL("src/assets/close.png")} alt="close" />
      </button>
    </nav>
  )
}

export default Nav
