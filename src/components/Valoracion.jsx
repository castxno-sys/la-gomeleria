export default function Valoracion({ restaurante }) {
  const calificacion = restaurante.calificacion.toLocaleString('es-CO', { minimumFractionDigits: 1 })

  return (
    <span className="valoracion">
      <span aria-hidden="true">★</span>
      <span className="solo-lectores">Calificación </span>
      {calificacion}
      <span className="valoracion-opiniones"> ({restaurante.opiniones})</span>
    </span>
  )
}
