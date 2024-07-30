import { useState } from 'react'
import Nav from './components/Nav'
import PromptBox from './components/PromptBox'
import UserPrompt from './components/UserPrompt'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <div className='sidebar'>
        
        <div className='openText'>
          <h1>Hello, human :-&#41;</h1>
          <p><span className='techText'>&#40; </span>Ask me anything...<span className='techText'> &#41; :</span></p>
        </div>
        <div className='funcbox'>
          <PromptBox />
        </div>
        <UserPrompt />
      </div>
    </>
  )
}

export default App
