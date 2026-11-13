import { useEffect } from 'react'

export default function Carrito({ carrito, onQuitar, onVaciar }) {
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + Math.round(Number(item.precio) * 100) * item.cantidad, 0) / 100

  useEffect(() => {
    document.title = `Carrito (${unidades}) — Cafetería`
    console.log(`Unidades en el carrito: ${unidades}`)
  }, [unidades])

  return <aside className="lab-card lab-cart">
    <h2>Tu carrito</h2><p className="lab-muted">Un buen descanso empieza aquí.</p>
    {!carrito.length ? <p className="lab-empty">El carrito está vacío</p> :
      <ul>{carrito.map(item => <li key={item.id}>
        <div><strong>{item.nombre}</strong><small>{item.cantidad} × S/ {Number(item.precio).toFixed(2)}</small></div>
        <button onClick={() => onQuitar(item.id)}>Quitar</button>
      </li>)}</ul>}
    <p>Unidades: {unidades}</p>
    <p className="lab-total">Total: S/ {total.toFixed(2)}</p>
    <button className="lab-secondary" disabled={!carrito.length} onClick={onVaciar}>Vaciar carrito</button>
  </aside>
}