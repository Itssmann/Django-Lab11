import { useEffect } from 'react'

export default function Aviso({ aviso, onCerrar }) {
  useEffect(() => {
    if (!aviso) return
    const temporizador = setTimeout(onCerrar, 3000)
    return () => clearTimeout(temporizador)
  }, [aviso, onCerrar])
  return <div className="lab-notice" role="status" aria-live="polite">{aviso?.mensaje || ''}</div>
}