import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ResumeEditor } from './components/resumeEditor'
import { ResumePreview } from './components/resumePreview'

import "./styles/fontColour.css"
import "./styles/main.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeEditor />
    <ResumePreview />
  </StrictMode>,
)
