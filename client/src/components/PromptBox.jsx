import React from 'react'
import './PromptBox.css'
import { useState, useEffect } from 'react';

function PromptBox({ select, setSelect }) {
  
  useEffect(() => {
    console.log(select);
  }, [select]);
  
  return (
    <div className='box-container'>
        <div 
          className={`promptbox ${select === 'web' ? 'web-select' : 'web'}`}
          onClick={() => {
            if (select === '') {
              setSelect('web');
            } else {
              setSelect('');
            }
          }}
        >
          <div className={`${select === 'web' ? 'checkbox-select' : 'checkbox'}`}>
            <img src={chrome.runtime.getURL("src/assets/check.png")} alt="menu" />
          </div>
        </div>
        <div 
          className={`promptbox ${select === 'internet' ? 'internet-select' : 'internet'}`}
          onClick={() => {
            if (select === '') {
              setSelect('internet');
            } else {
              setSelect('');
            }
          }}
        >
          <div className={`${select === 'internet' ? 'checkbox-select' : 'checkbox'}`}>
            <img src={chrome.runtime.getURL("src/assets/check.png")} alt="menu" />
          </div>
        </div>
        <div 
          className={`promptbox ${select === 'youtube' ? 'youtube-select' : 'youtube'}`}
          onClick={() => {
            if (select === '') {
              setSelect('youtube');
            } else {
              setSelect('');
            }
          }}
        >
          <div className={`${select === 'youtube' ? 'checkbox-select' : 'checkbox'}`}>
            <img src={chrome.runtime.getURL("src/assets/check.png")} alt="menu" />
          </div>
        </div>
        <div 
          className={`promptbox ${select === 'action' ? 'action-select' : 'action'}`}
          onClick={() => {
            if (select === '') {
              setSelect('action');
            } else {
              setSelect('');
            }
          }}
        >
          <div className={`${select === 'action' ? 'checkbox-select' : 'checkbox'}`}>
            <img src={chrome.runtime.getURL("src/assets/check.png")} alt="menu" />
          </div>
        </div>
    </div>
  )
}

export default PromptBox
