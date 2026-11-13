export default function ProductoCard({ producto, cantidad, onAgregar }) {
  const restante = producto.stock - cantidad
  return <article className="lab-product">
    <div className="lab-product-icon" aria-hidden="true">{['☕', '☕', '🍰', '🍊', '🍞'][producto.id - 1]}</div>
    <h3>{producto.nombre}</h3>
    <p className="lab-price">S/ {Number(producto.precio).toFixed(2)}</p>
    <p>{producto.stock === 0 ? 'Agotado' : restante > 0 ? `Disponibles: ${restante}` : 'Sin stock disponible'}</p>
    <button className="lab-primary" disabled={restante <= 0} onClick={() => onAgregar(producto)}>Agregar</button>
  </article>
}