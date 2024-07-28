import { useState } from 'react'
import Nav from './components/Nav'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='sidebar'>
        <Nav />
          <div className='openText'>
            <h1>Hello, human :-&#41;</h1>
            <p><span className='techText'>&#40; </span>Ask me anything...<span className='techText'> &#41; :</span></p>
          </div>
      </div>
    </>
  )
}

export default App
