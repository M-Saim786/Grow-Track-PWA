import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 👇 PWA Service Worker Register
import { registerSW } from 'virtual:pwa-register'

registerSW({
    onNeedRefresh() {
        console.log('New content available, refresh needed.')
    },
    onOfflineReady() {
        console.log('App ready to work offline.')
    },
})


createRoot(document.getElementById("root")!).render(<React.StrictMode>
    <App />
</React.StrictMode>,);
