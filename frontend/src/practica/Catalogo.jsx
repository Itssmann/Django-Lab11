import ProductoCard from './ProductoCard.jsx'
export default function Catalogo({ productos, carrito, onAgregar }) {
  return productos.length ? <div className="lab-products">{productos.map(producto =>
    <ProductoCard key={producto.id} producto={producto} cantidad={carrito.find(item => item.id === producto.id)?.cantidad || 0} onAgregar={onAgregar} />
  )}</div> : <p className="lab-empty">No hay productos que coincidan</p>
}