import { Link } from 'react-router-dom'
import { usePedido } from '../context/PedidoContext.jsx'
import { formatoPrecio } from '../utils/formato.js'
import Cantidad from './Cantidad.jsx'

export default function PlatoCard({ plato, mostrarCocina = false }) {
  const { cantidades, agregar, quitar } = usePedido()
  const cantidad = cantidades[plato.id] ?? 0

  return (
    <article className="plato">
      <div className="plato-info">
        <h3>{plato.nombre}</h3>
        {mostrarCocina && (
          <Link to={`/menu/${plato.restauranteId}`} className="plato-cocina">
            {plato.restaurante}
          </Link>
        )}
        <p>{plato.descripcion}</p>
        <span className="precio">{formatoPrecio(plato.precio)}</span>
      </div>
      <div className="plato-lateral">
        {/* Con `imagen` en los datos se muestra la foto; si no, el emoji. */}
        <div className="plato-imagen" style={{ background: plato.tono }} aria-hidden="true">
          {plato.imagen ? <img src={plato.imagen} alt="" loading="lazy" /> : plato.emoji}
        </div>
        {cantidad === 0 ? (
          <button
            type="button"
            className="boton boton-primario boton-chico"
            onClick={() => agregar(plato.id)}
            aria-label={`Agregar ${plato.nombre} al pedido`}
          >
            Agregar
          </button>
        ) : (
          <Cantidad
            nombre={plato.nombre}
            cantidad={cantidad}
            onSumar={() => agregar(plato.id)}
            onRestar={() => quitar(plato.id)}
          />
        )}
      </div>
    </article>
  )
}
