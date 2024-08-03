import React from 'react'
import { Link } from "react-router-dom";
import UserPrompt from './UserPrompt'
import Nav from './Nav'

function Chat() {
  return (
    <div className='response'>
        <Nav />
        <Link to={'/*'}>
            <button className='newButton'>new chat+</button>
        </Link>
        <h1>Hello</h1>
        <p>this is the result page</p>
        <UserPrompt />
    </div>
  )
}

export default Chat
