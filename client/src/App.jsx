import { useState } from 'react'
import Nav from './components/Nav'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='sidebar'>
        <Nav />
          <h1>Hello, human :-&#41;</h1>
      </div>
    </>
  )
}

export default App
