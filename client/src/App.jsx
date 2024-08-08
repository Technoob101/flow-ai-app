import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import PromptBox from './components/PromptBox'
import UserPrompt from './components/UserPrompt'
import Chat from './components/Chat'
import './App.css'

function App() {
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [ chatHistory, setChatHistory ] = useState([])
  const [error, setError] = useState('');
  const [select, setSelect] = useState('');
 
  async function getResponse() {
    if(!value) {
      setError("**error please enter prompt!! ")
      return
    } else {
      setError("")
    }

    //url path
    let url = 'http://localhost:3000/gemini'

    //send object to post request
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      console.log('sent')
      const response = await fetch(url, options)
      console.log('recieve')
      const data = await response.text()
      console.log(data)
      navigate('/chat', { state: {value, error, chatHistory} })
      console.log('navigate')
      
      //history format for gemini
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: [{ text: value }]
      },
      {
        role: "model",
        parts: [{ text:data }]
      },
      ])
      setValue("")
      } catch(error) {
          console.error(error)
          setError("**error something wrong!!")
      }
  }

  return (
    <>
      <Nav />
      <Routes>
      <Route path="/*" element={
          <div className='sidebar'>
            <div className='openText'>
              <h1>Hello, human :-&#41;</h1>
              <p><span className='techText'>&#40; </span>Ask me anything...<span className='techText'> &#41; :</span></p>
            </div>
            <div className='funcbox'>
              <PromptBox 
                select={select}
                setSelect={setSelect}
              />
            </div>
            <UserPrompt 
              value={value}
              setValue={setValue}
              getResponse={getResponse}
              error={error}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
            />
          </div>
        } />
        <Route path="/chat" element={
          <Chat 
            value={value}
            setValue={setValue}
            getResponse={getResponse}
            error={error}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        } />
      </Routes>
    </>
  )
}

export default App
