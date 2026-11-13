import { useState } from 'react'
import { rubros } from './datosPrestadores.js'
const inicial = { nombre: '', rubro: '', telefono: '', disponible: true }

export default function FormularioPrestador({ onGuardar }) {
  const [campos, setCampos] = useState(inicial)
  const [errores, setErrores] = useState({})
  function cambiar(e) {
    const { name, value, type, checked } = e.target
    setCampos(actual => ({ ...actual, [name]: type === 'checkbox' ? checked : value }))
  }
  function enviar(e) {
    e.preventDefault()
    const nuevosErrores = {}
    if (campos.nombre.trim().length < 3) nuevosErrores.nombre = 'Ingresa un nombre de al menos 3 caracteres.'
    if (!rubros.includes(campos.rubro)) nuevosErrores.rubro = 'Selecciona un rubro.'
    if (!/^9\d{8}$/.test(campos.telefono.trim())) nuevosErrores.telefono = 'Ingresa 9 dígitos; el teléfono debe comenzar con 9.'
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length) return
    const error = onGuardar({ ...campos, nombre: campos.nombre.trim(), telefono: campos.telefono.trim() })
    if (error) { setErrores({ telefono: error }); return }
    setCampos(inicial)
  }
  return <aside className="lab-card">
    <p className="lab-eyebrow">SUMA TALENTO</p><h2>Nuevo prestador</h2><p className="lab-muted">Agrega un especialista a la comunidad.</p>
    <form className="lab-form" onSubmit={enviar} noValidate>
      <label>Nombre completo<input name="nombre" value={campos.nombre} onChange={cambiar} placeholder="Ej. Andrea Mendoza" required maxLength={80} aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? 'error-nombre' : undefined} /></label>
      {errores.nombre && <p id="error-nombre" className="lab-error" role="alert">{errores.nombre}</p>}
      <label htmlFor="prestador-rubro">Rubro</label><select id="prestador-rubro" name="rubro" value={campos.rubro} onChange={cambiar} required aria-invalid={!!errores.rubro} aria-describedby={errores.rubro ? 'error-rubro' : undefined}><option value="">Selecciona una especialidad</option>{rubros.map(r => <option key={r}>{r}</option>)}</select>
      {errores.rubro && <p id="error-rubro" className="lab-error" role="alert">{errores.rubro}</p>}
      <label>Teléfono<input name="telefono" type="tel" inputMode="numeric" value={campos.telefono} onChange={cambiar} placeholder="9XXXXXXXX" required maxLength={9} aria-invalid={!!errores.telefono} aria-describedby={errores.telefono ? 'error-telefono' : undefined} /></label>
      {errores.telefono && <p id="error-telefono" className="lab-error" role="alert">{errores.telefono}</p>}
      <label className="lab-check"><input type="checkbox" name="disponible" checked={campos.disponible} onChange={cambiar} /> Disponible para trabajar</label>
      <button className="lab-primary" type="submit">Registrar prestador</button>
    </form>
    <p className="lab-footnote">Datos de demostración. Los cambios duran mientras esta página esté abierta.</p>
  </aside>
}