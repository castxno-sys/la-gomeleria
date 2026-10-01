import { Link, NavLink } from 'react-router-dom'
import { usePedido } from '../context/PedidoContext.jsx'
import { plural } from '../utils/formato.js'
import Buscador from './Buscador.jsx'

export default function Encabezado() {
  const { totalUnidades } = usePedido()

  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <Link to="/" className="logo">
          La <em>Gomelería</em>
        </Link>
        <Buscador />
        {/* En celular esta navegación se muestra como barra de pestañas inferior. */}
        <nav aria-label="Principal" className="nav">
          <NavLink to="/" end>
            <span className="nav-icono" aria-hidden="true">
              🏠
            </span>
            Inicio
          </NavLink>
          <NavLink to="/menu">
            <span className="nav-icono" aria-hidden="true">
              🍽️
            </span>
            Menú
          </NavLink>
          <NavLink to="/pedidos">
            <span className="nav-icono" aria-hidden="true">
              🛍️
            </span>
            Pedido
            {totalUnidades > 0 && (
              <span className="insignia" aria-label={plural(totalUnidades, 'producto')}>
                {totalUnidades}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
