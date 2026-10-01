export default function Cantidad({ nombre, cantidad, onSumar, onRestar }) {
  return (
    <div className="cantidad" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button type="button" onClick={onRestar} aria-label={`Quitar una unidad de ${nombre}`}>
        −
      </button>
      <span aria-live="polite">{cantidad}</span>
      <button type="button" onClick={onSumar} aria-label={`Agregar una unidad de ${nombre}`}>
        +
      </button>
    </div>
  )
}
