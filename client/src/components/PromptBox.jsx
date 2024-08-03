import React from 'react'
import './PromptBox.css'

function PromptBox() {
  return (
    <div className='box-container'>
        <div className='promptbox internet'>
        </div>
        <div className='promptbox web'>
          <p>Web Search</p>
        </div>
        <div className='promptbox youtube'>
          <p>Youtube</p>
        </div>
        <div className='promptbox action'>
          <p>Action</p>
        </div>
    </div>
  )
}

export default PromptBox
