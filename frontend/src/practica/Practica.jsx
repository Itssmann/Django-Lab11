import { useCallback, useState } from 'react'
import { productos } from './datos.js'
import Catalogo from './Catalogo.jsx'
import Carrito from './Carrito.jsx'
import Buscador from './Buscador.jsx'
import Aviso from './Aviso.jsx'

export default function Practica() {
  const [carrito, setCarrito] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState(null)
  const cerrarAviso = useCallback(() => setAviso(null), [])
  function agregarAlCarrito(producto) {
    const id = producto.id
    if (!producto || (carrito.find(item => item.id === id)?.cantidad || 0) >= producto.stock) return
    setCarrito(actual => {
      const existente = actual.find(item => item.id === id)
      if ((existente?.cantidad || 0) >= producto.stock) return actual
      return existente ? actual.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item) : [...actual, { ...producto, cantidad: 1 }]
    })
    setAviso({ mensaje: `Agregado: ${producto.nombre}` })
  }
  function quitar(id) {
    setCarrito(actual => actual.filter(item => item.id !== id))
    setAviso({ mensaje: 'Se quitó el producto del carrito.' })
  }
  function vaciar() {
    setCarrito([])
    setAviso({ mensaje: 'Carrito vaciado.' })
  }
  const visibles = productos.filter(item => item.nombre.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es')))
  return <main className="lab-page">
    <p className="lab-eyebrow">PARTE 01 / COMUNICACIÓN ENTRE COMPONENTES</p>
    <h1>Una pausa, un buen café.</h1><p className="lab-muted">Explora el catálogo y arma tu pedido.</p>
    <Aviso aviso={aviso} onCerrar={cerrarAviso} />
    <div className="lab-layout"><div><Buscador busqueda={busqueda} onBuscar={setBusqueda} /><Catalogo productos={visibles} carrito={carrito} onAgregar={agregarAlCarrito} /></div>
      <Carrito carrito={carrito} onQuitar={quitar} onVaciar={vaciar} /></div>
  </main>
}