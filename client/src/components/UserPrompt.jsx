import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './UserPrompt.css'

function UserPrompt() {
  
  const [value, setValue] = useState('');
  const [ chatHistory, setChatHistory ] = useState([])
  const [error, setError] = useState('');


  async function getResponse() {
    if(!value) {
      setError("**error please enter prompt!! ")
      return
    }
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
      const response = await fetch('http://localhost:3000/gemini', options)
      const data = await response.text()
      console.log(data)
      setValue("")
      } catch(error) {
          console.error(error)
          setError("**error something wrong!!")
        }
    }

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const adjustHeight = e => {
        textarea.style.height = "auto";
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
      };

      textarea.addEventListener("keyup", adjustHeight);

      // Cleanup event listener on component unmount
      return () => {
        textarea.removeEventListener("keyup", adjustHeight);
      };
    }
  }, []);
  
  return (
    <div className='userprompt'>
        <div className='inputwrap'>
          <textarea rows='1' placeholder='ex: latest llm research..' onChange={(e) => setValue(e.target.value)}></textarea>
          <Link to={'/chat'}>
            <button className='sendprompt' onClick={ getResponse }>=&gt;</button>
          </Link>
        </div>
    </div>
  )
}

export default UserPrompt
