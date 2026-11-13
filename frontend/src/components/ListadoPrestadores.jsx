import FilaPrestador from './FilaPrestador.jsx'
export default function ListadoPrestadores({ prestadores, onAlternar, onEliminar }) {
  return prestadores.length ? <div className="lab-table-wrap"><table>
    <caption className="lab-sr-only">Prestadores de servicios y acciones</caption>
    <thead><tr><th scope="col">Prestador</th><th scope="col">Rubro / teléfono</th><th scope="col">Estado</th><th scope="col">Acciones</th></tr></thead>
    <tbody>{prestadores.map(prestador => <FilaPrestador key={prestador.id} prestador={prestador} onAlternar={onAlternar} onEliminar={onEliminar} />)}</tbody>
  </table></div> : <p className="lab-empty">No se encontraron prestadores. Prueba otra búsqueda o registra uno nuevo.</p>
}