import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Laboratorio from './Laboratorio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode><Laboratorio /></StrictMode>,
)