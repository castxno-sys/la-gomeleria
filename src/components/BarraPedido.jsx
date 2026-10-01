import { Link, useLocation } from 'react-router-dom'
import { usePedido } from '../context/PedidoContext.jsx'
import { formatoPrecio, plural } from '../utils/formato.js'

export default function BarraPedido() {
  const { pathname } = useLocation()
  const { totalUnidades, subtotal } = usePedido()

  if (totalUnidades === 0 || pathname === '/pedidos') return null

  return (
    <>
      <div className="barra-pedido-espacio" />
      <div className="barra-pedido" role="status">
        <Link to="/pedidos" className="barra-pedido-boton">
          <span className="barra-pedido-cantidad" aria-label={plural(totalUnidades, 'producto')}>
            {totalUnidades}
          </span>
          <span className="barra-pedido-texto">Ver mi pedido</span>
          <strong>{formatoPrecio(subtotal)}</strong>
        </Link>
      </div>
    </>
  )
}
