import { Link } from 'react-router-dom'
import { categorias } from '../data/menu.js'

export default function Categorias({ activa = '', conTodo = false }) {
  return (
    <nav className="categorias" aria-label="Categorías de comida">
      {conTodo && (
        <Link to="/menu" className="categoria" aria-current={activa === '' ? 'true' : undefined}>
          <span className="categoria-icono" aria-hidden="true">
            🍽️
          </span>
          Todo
        </Link>
      )}
      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          to={`/menu?categoria=${categoria.id}`}
          className="categoria"
          aria-current={activa === categoria.id ? 'true' : undefined}
        >
          <span className="categoria-icono" aria-hidden="true">
            {categoria.emoji}
          </span>
          {categoria.nombre}
        </Link>
      ))}
    </nav>
  )
}
