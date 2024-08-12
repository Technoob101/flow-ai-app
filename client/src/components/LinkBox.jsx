import React from 'react'
import './LinkBox.css';

function LinkBox({link, title}) {
    return (
        <div className='linkbox'>
            <ul>
              {link.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {title[index]}
                  </a>
                </li>
              ))}
            </ul>
        </div>
    );
}

export default LinkBox
