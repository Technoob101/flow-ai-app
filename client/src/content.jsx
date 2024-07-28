import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    if (root.style.display === 'none') {
      root.style.display = 'block';
    } else {
      root.style.display = 'none';
    }
  }
});

ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)