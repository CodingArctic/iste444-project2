import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContentProvider } from './utils/ContentProvider.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContentProvider>
            <App />
        </ContentProvider>
    </StrictMode>,
)
