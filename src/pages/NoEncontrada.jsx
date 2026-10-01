import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <div className="contenedor pagina vacio">
      <span className="vacio-emoji" aria-hidden="true">
        🍽️
      </span>
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="boton boton-primario">
        Volver al inicio
      </Link>
    </div>
  )
}
