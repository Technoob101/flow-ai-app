import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import UserPrompt from './UserPrompt'
import Nav from './Nav'
import './Chat.css'

function Chat({ value, setValue, getResponse, error, chatHistory, setChatHistory }) {
  const location = useLocation();
  const state = location.state;

  const newChat = () => {
    setValue("");
    setChatHistory([]);
  };

  return (
    <>
      <Link to={'/*'}>
              <button className='newButton' onClick={newChat}>new chat+</button>
      </Link>
      <div className='response-wrap'>
        <div className='search-result'>
          {chatHistory.map((chatItem, _index) => 
              <div key={_index}>
                {chatItem.role === 'user' ? (
                  <p className='user-input'>{chatItem.parts.map(part => part.text).join(", ")}</p>
                ) : (
                  <div className='model-response'>
                    <p className='response-top'><span className='techText'>&#40; </span>response<span className='techText'> &#41; :</span></p>
                    <p className='model-answer'>{chatItem.role} : {chatItem.parts.map(part => part.text).join(", ")}</p>
                  </div>
                )}
              </div>)}
        </div>
      </div>
      <UserPrompt 
        value = {value}
        setValue = {setValue}
        getResponse = {getResponse}
        error = {error}
      />
    </>
  )
}

export default Chat
