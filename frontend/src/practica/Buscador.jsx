export default function Buscador({ busqueda, onBuscar }) {
  return <label className="lab-search">Buscar producto
    <input type="search" placeholder="Café, torta, tostada…" value={busqueda} onChange={e => onBuscar(e.target.value)} />
  </label>
}