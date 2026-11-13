export default function FilaPrestador({ prestador, onAlternar, onEliminar }) {
  return <tr>
    <td><div className="lab-person"><span className="lab-avatar" aria-hidden="true">{prestador.nombre.split(' ').map(p => p[0]).slice(0, 2).join('')}</span><div><strong>{prestador.nombre}</strong><small>Prestador #{prestador.id}</small></div></div></td>
    <td>{prestador.rubro}<small>{prestador.telefono}</small></td>
    <td><span className={`lab-badge ${prestador.disponible ? 'is-available' : ''}`}>{prestador.disponible ? 'Disponible' : 'No disponible'}</span></td>
    <td><div className="lab-actions"><button onClick={() => onAlternar(prestador.id)} aria-label={`${prestador.disponible ? 'Desactivar' : 'Activar'} a ${prestador.nombre}`}>{prestador.disponible ? 'Desactivar' : 'Activar'}</button>
      <button className="lab-danger" onClick={() => onEliminar(prestador.id)} aria-label={`Eliminar a ${prestador.nombre}`}>Eliminar</button></div></td>
  </tr>
}