import { Link, useParams } from 'react-router-dom'
import PlatoCard from '../components/PlatoCard.jsx'
import Valoracion from '../components/Valoracion.jsx'
import { platos, restaurantes, tarifas } from '../data/menu.js'
import { formatoPrecio, formatoTiempo } from '../utils/formato.js'
import NoEncontrada from './NoEncontrada.jsx'

export default function Restaurante() {
  const { restauranteId } = useParams()
  const restaurante = restaurantes.find((opcion) => opcion.id === restauranteId)

  if (!restaurante) return <NoEncontrada />

  const carta = platos.filter((plato) => plato.restauranteId === restaurante.id)

  return (
    <div className="contenedor pagina">
      <Link to="/menu" className="enlace">
        ← Todas las cocinas
      </Link>

      <header className="cocina" style={{ background: restaurante.tono }}>
        <span className="cocina-emoji" aria-hidden="true">
          {restaurante.emoji}
        </span>
        <div>
          <h1>{restaurante.nombre}</h1>
          <p>{restaurante.etiquetas}</p>
          <p className="cocina-datos">
            <Valoracion restaurante={restaurante} />
            <span aria-hidden="true">·</span>
            <span>{formatoTiempo(restaurante.tiempo)}</span>
            <span aria-hidden="true">·</span>
            <span>Domicilio {formatoPrecio(tarifas.domicilio)}</span>
          </p>
        </div>
      </header>

      <h2 className="subtitulo">La carta</h2>
      <div className="grilla-platos">
        {carta.map((plato) => (
          <PlatoCard key={plato.id} plato={plato} />
        ))}
      </div>
    </div>
  )
}
