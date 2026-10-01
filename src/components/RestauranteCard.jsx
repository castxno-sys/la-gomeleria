import { Link } from 'react-router-dom'
import { tarifas } from '../data/menu.js'
import { formatoPrecio, formatoTiempo } from '../utils/formato.js'
import Valoracion from './Valoracion.jsx'

export default function RestauranteCard({ restaurante }) {
  return (
    <Link to={`/menu/${restaurante.id}`} className="restaurante">
      <div className="restaurante-portada" style={{ background: restaurante.tono }} aria-hidden="true">
        {restaurante.imagen ? <img src={restaurante.imagen} alt="" loading="lazy" /> : restaurante.emoji}
      </div>
      <div className="restaurante-info">
        <h3>{restaurante.nombre}</h3>
        <p>{restaurante.etiquetas}</p>
        <p className="restaurante-datos">
          <Valoracion restaurante={restaurante} />
          <span aria-hidden="true">·</span>
          <span>{formatoTiempo(restaurante.tiempo)}</span>
          <span aria-hidden="true">·</span>
          <span>Envío {formatoPrecio(tarifas.domicilio)}</span>
        </p>
      </div>
    </Link>
  )
}
