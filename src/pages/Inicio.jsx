import { Link } from 'react-router-dom'
import Categorias from '../components/Categorias.jsx'
import PlatoCard from '../components/PlatoCard.jsx'
import RestauranteCard from '../components/RestauranteCard.jsx'
import { negocio, platos, restaurantes, tarifas } from '../data/menu.js'
import { formatoPrecio } from '../utils/formato.js'

const anuncios = [
  {
    clase: 'anuncio-naranja',
    titulo: 'Domicilio gratis',
    texto: `En pedidos desde ${formatoPrecio(tarifas.envioGratisDesde)}.`,
    enlace: '/menu',
    accion: 'Pedir ahora',
    emoji: '🛵',
  },
  {
    clase: 'anuncio-amarillo',
    titulo: 'Noche de sushi',
    texto: 'Rolls y nigiris de Maki Privé, recién hechos.',
    enlace: '/menu/maki-prive',
    accion: 'Ver la carta',
    emoji: '🍣',
  },
  {
    clase: 'anuncio-verde',
    titulo: 'Brunch todo el día',
    texto: 'Tostadas, benedictinos y pancakes a cualquier hora.',
    enlace: '/menu/brunch-dorado',
    accion: 'Se me antoja',
    emoji: '🥐',
  },
]

export default function Inicio() {
  const favoritos = [...restaurantes].sort((a, b) => b.calificacion - a.calificacion).slice(0, 4)
  const destacados = platos.filter((plato) => plato.destacado)

  return (
    <>
      <section className="hero">
        <div className="contenedor hero-contenido">
          <div>
            <p className="hero-etiqueta">{restaurantes.length} cocinas · un solo pedido</p>
            <h1>
              ¿Con hambre? <em>Pide y te lo llevamos</em>
            </h1>
            <p className="hero-texto">
              Hamburguesas, pizza, sushi, postres y más. Mira el total antes de confirmar.
            </p>
            <div className="hero-acciones">
              <Link to="/menu" className="boton boton-claro">
                Ver el menú
              </Link>
              <Link to="/pedidos" className="boton boton-borde-claro">
                Mi pedido
              </Link>
            </div>
          </div>
          <div className="hero-emojis" aria-hidden="true">
            <span>🍔</span>
            <span>🛵</span>
            <span>🍕</span>
          </div>
        </div>
      </section>

      <section className="seccion contenedor">
        <h2>¿Qué se te antoja hoy?</h2>
        <Categorias />
      </section>

      <section className="seccion contenedor" aria-label="Promociones">
        <div className="anuncios">
          {anuncios.map((anuncio) => (
            <Link key={anuncio.titulo} to={anuncio.enlace} className={`anuncio ${anuncio.clase}`}>
              <div>
                <h3>{anuncio.titulo}</h3>
                <p>{anuncio.texto}</p>
                <span className="anuncio-accion">{anuncio.accion} →</span>
              </div>
              <span className="anuncio-emoji" aria-hidden="true">
                {anuncio.emoji}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="seccion contenedor">
        <div className="seccion-encabezado">
          <h2>Restaurantes favoritos</h2>
          <Link to="/menu" className="enlace">
            Ver todas →
          </Link>
        </div>
        <div className="grilla-restaurantes">
          {favoritos.map((restaurante) => (
            <RestauranteCard key={restaurante.id} restaurante={restaurante} />
          ))}
        </div>
      </section>

      <section className="seccion contenedor">
        <div className="seccion-encabezado">
          <h2>Los más pedidos</h2>
          <p className="seccion-nota">{negocio.horario}</p>
        </div>
        <div className="grilla-platos">
          {destacados.map((plato) => (
            <PlatoCard key={plato.id} plato={plato} mostrarCocina />
          ))}
        </div>
      </section>
    </>
  )
}
