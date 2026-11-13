export default function ResumenPrestadores({ prestadores }) {
  const disponibles = prestadores.filter(p => p.disponible).length
  return <div className="lab-stats">
    {[['Total de prestadores', prestadores.length, 'Tu comunidad de especialistas'], ['Disponibles', disponibles, 'Listos para una nueva chamba'], ['No disponibles', prestadores.length - disponibles, 'En pausa por el momento']].map(([titulo, valor, detalle], i) =>
      <article className={`lab-stat lab-stat-${i}`} key={titulo}><p>{titulo}</p><strong>{valor}</strong><small>{detalle}</small></article>)}
  </div>
}