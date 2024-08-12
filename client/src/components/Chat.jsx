import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import UserPrompt from './UserPrompt';
import './Chat.css';
import LinkBox from './LinkBox';

function Chat({ value, setValue, getResponse, error, chatHistory, setChatHistory, select, setSelect, link, setLink, title, setTitle }) {
  const location = useLocation();
  const state = location.state;

  const newChat = () => {
    setValue("");
    setChatHistory([]);
    setSelect('');
  };

  const formatText = (text) => {
    console.log("Formatting text:", text); // Debug log
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle lines starting with ** (bold and new line)
      if (line.startsWith('**')) {
        const content = line.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
        return <p key={index}><strong>{content}</strong></p>;
      }
      // Handle lines with * (asterisk should disappear but not bold)
      else if (line.startsWith('*')) {
        const content = line.replace(/^\*/, '').replace(/\*$/, '').trim();
        return <p key={index}>{content}</p>;
      }
      // Handle headers
      else if (line.startsWith('#')) {
        const headerLevel = line.match(/^#+/)[0].length;
        const HeaderTag = `h${headerLevel}`;
        const headerContent = line.replace(/^#+\s/, '');
        return <HeaderTag key={index}>{headerContent}</HeaderTag>;
      }
      // Regular text
      else {
        return <p key={index}>{line}</p>;
      }
    });
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
                  <p className='response-top'><span className='techText'>&#40; </span>model<span className='techText'> &#41; :</span></p>
                  <div className='model-answer'>
                    {chatItem.parts.map((part, partIndex) => {
                      console.log("Part text:", part.text); // Debug log
                      return (
                        <React.Fragment key={partIndex}>
                          {formatText(part.text)}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {select === 'internet' && (
                    <LinkBox 
                      link={link}
                      setLink={setLink}
                      title={title}
                      setTitle={setTitle}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <UserPrompt 
        value={value}
        setValue={setValue}
        getResponse={getResponse}
        error={error}
      />
    </>
  );
}

export default Chat;
