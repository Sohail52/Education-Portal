import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LayoutProvider } from './context/LayoutContext'
import { ProgressProvider } from './context/ProgressContext'
import { NotificationProvider } from './context/NotificationContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <ThemeProvider>
                    <LayoutProvider>
                        <ProgressProvider>
                            <NotificationProvider>
                                <App />
                            </NotificationProvider>
                        </ProgressProvider>
                    </LayoutProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
