import { useCallback, useRef, useState } from 'react'
import { prestadoresIniciales } from './datosPrestadores.js'
import ListadoPrestadores from './ListadoPrestadores.jsx'
import FormularioPrestador from './FormularioPrestador.jsx'
import ResumenPrestadores from './ResumenPrestadores.jsx'
import BuscadorPrestadores from './BuscadorPrestadores.jsx'
import AvisoPrestadores from './AvisoPrestadores.jsx'

export default function PanelPrestadores() {
  const [prestadores, setPrestadores] = useState(prestadoresIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState(null)
  const siguienteId = useRef(6)
  const cerrarAviso = useCallback(() => setAviso(null), [])
  function alternar(id) {
    setPrestadores(actual => actual.map(p => p.id === id ? { ...p, disponible: !p.disponible } : p))
    setAviso({ mensaje: 'Disponibilidad actualizada.' })
  }
  function eliminar(id) {
    setPrestadores(actual => actual.filter(p => p.id !== id))
    setAviso({ mensaje: 'Prestador eliminado.' })
  }
  function guardar(datos) {
    if (prestadores.some(p => p.telefono === datos.telefono)) return 'Este teléfono ya está registrado.'
    const nuevo = { ...datos, id: siguienteId.current++ }
    setPrestadores(actual => [...actual, nuevo])
    setAviso({ mensaje: `${datos.nombre} registrado correctamente.` })
    return null
  }
  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const visibles = prestadores.filter(p => normalizar(`${p.nombre} ${p.rubro}`).includes(normalizar(busqueda.trim())))
  return <main className="lab-page">
    <div className="lab-heading"><div><p className="lab-eyebrow">PARTE 02 / PANEL ADMINISTRATIVO</p><h1>Personas que resuelven.</h1><p className="lab-muted">Gestiona a los especialistas que hacen posible cada chamba.</p></div><span className="lab-demo">● Entorno de práctica</span></div>
    <ResumenPrestadores prestadores={prestadores} />
    <AvisoPrestadores aviso={aviso} onCerrar={cerrarAviso} />
    <div className="lab-layout"><section className="lab-card"><div className="lab-section-heading"><h2>Directorio de prestadores</h2><span>{visibles.length} registros</span></div>
      <BuscadorPrestadores busqueda={busqueda} onBuscar={setBusqueda} />
      <ListadoPrestadores prestadores={visibles} onAlternar={alternar} onEliminar={eliminar} />
    </section><FormularioPrestador onGuardar={guardar} /></div>
    <footer className="lab-footer">CHAMBA-PE / SIMULACIÓN INDEPENDIENTE <span>React · Props · Estado · Callbacks</span></footer>
  </main>
}