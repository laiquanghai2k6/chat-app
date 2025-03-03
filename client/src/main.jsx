import { StrictMode } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import ChatContextProvider from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>

    <ChatContextProvider>

        <App />
        <SpeedInsights />
    </ChatContextProvider>
    </AuthContextProvider>

    </BrowserRouter>
  </StrictMode>,
)
