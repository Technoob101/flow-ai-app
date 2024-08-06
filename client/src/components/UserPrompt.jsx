import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './UserPrompt.css'

function UserPrompt({ value, setValue, getResponse, error, chatHistory, setChatHistory }) {
  
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
    <div className='promptwrap'>
      {error && <p className='error'>{error}</p>}
      <div className='userprompt'>
        <div className='inputwrap'>
          <textarea rows='1' placeholder='ex: latest llm research..' onChange={(e) => setValue(e.target.value)}  value = {value}></textarea>
          <Link to={'/chat'}>
            <button className='sendprompt' onClick={ getResponse }>=&gt;</button>
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default UserPrompt
