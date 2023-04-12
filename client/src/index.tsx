import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter  >
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
)
