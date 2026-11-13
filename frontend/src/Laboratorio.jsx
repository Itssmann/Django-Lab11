import { useState } from 'react'
import App from './App.jsx'
import Practica from './practica/Practica.jsx'
import PanelPrestadores from './components/PanelPrestadores.jsx'
import './laboratorio.css'

export default function Laboratorio() {
  const [vista, setVista] = useState('prestadores')
  return <>
    <header className="lab-nav">
      <a className="lab-brand" href="#inicio">chamba<span>PE.</span><small>LABORATORIO 11</small></a>
      <nav aria-label="Secciones del laboratorio">
        {[['biblioteca', 'Biblioteca'], ['cafeteria', 'Cafetería'], ['prestadores', 'Prestadores']].map(([id, titulo]) =>
          <button key={id} aria-current={vista === id ? 'page' : undefined} onClick={() => setVista(id)}>{titulo}</button>)}
      </nav>
      <span className="lab-demo">Simulación local</span>
    </header>
    <div id="inicio">
      <section hidden={vista !== 'biblioteca'}><App /></section>
      <section hidden={vista !== 'cafeteria'}><Practica /></section>
      <section hidden={vista !== 'prestadores'}><PanelPrestadores /></section>
    </div>
  </>
}