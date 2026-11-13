export default function BuscadorPrestadores({ busqueda, onBuscar }) {
  return <label className="lab-search">Buscar prestadores
    <input type="search" placeholder="Buscar por nombre o rubro…" value={busqueda} onChange={e => onBuscar(e.target.value)} />
  </label>
}