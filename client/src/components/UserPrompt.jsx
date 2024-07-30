import React from 'react'
import './UserPrompt.css'

function UserPrompt() {
  return (
    <div className='userprompt'>
        <input 
            type="text"
            placeholder='ex: Where is Messi...?' 
        />
    </div>
  )
}

export default UserPrompt
