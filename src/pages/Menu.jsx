import { Link, useSearchParams } from 'react-router-dom'
import Categorias from '../components/Categorias.jsx'
import PlatoCard from '../components/PlatoCard.jsx'
import RestauranteCard from '../components/RestauranteCard.jsx'
import { categorias, platos, restaurantes } from '../data/menu.js'
import { normalizar, plural } from '../utils/formato.js'

export default function Menu() {
  const [parametros] = useSearchParams()
  const busqueda = (parametros.get('q') ?? '').trim()
  const categoria = categorias.find((opcion) => opcion.id === parametros.get('categoria'))

  if (busqueda) return <Resultados busqueda={busqueda} />

  const visibles = categoria
    ? restaurantes.filter((restaurante) => restaurante.categoria === categoria.id)
    : restaurantes

  return (
    <div className="contenedor pagina">
      <h1>{categoria ? categoria.nombre : 'Nuestro menú'}</h1>
      <p className="pagina-intro">
        Elige una cocina para ver su carta. Puedes combinar platos de varias en el mismo pedido.
      </p>

      <Categorias activa={categoria?.id ?? ''} conTodo />

      <div className="grilla-restaurantes">
        {visibles.map((restaurante) => (
          <RestauranteCard key={restaurante.id} restaurante={restaurante} />
        ))}
      </div>
    </div>
  )
}

function Resultados({ busqueda }) {
  const termino = normalizar(busqueda)
  const nombreCategoria = (id) => categorias.find((categoria) => categoria.id === id).nombre

  const cocinas = restaurantes.filter((restaurante) =>
    normalizar(`${restaurante.nombre} ${restaurante.etiquetas}`).includes(termino),
  )
  const encontrados = platos.filter((plato) =>
    normalizar(
      `${plato.nombre} ${plato.descripcion} ${plato.restaurante} ${nombreCategoria(plato.categoria)}`,
    ).includes(termino),
  )
  const sinResultados = cocinas.length === 0 && encontrados.length === 0

  return (
    <div className="contenedor pagina">
      <h1>Resultados para «{busqueda}»</h1>
      <p className="pagina-intro">
        {sinResultados
          ? 'No encontramos platos ni cocinas con ese nombre.'
          : `${plural(encontrados.length, 'plato')} y ${plural(cocinas.length, 'cocina')}.`}{' '}
        <Link to="/menu" className="enlace">
          Ver todo el menú
        </Link>
      </p>

      {sinResultados && (
        <>
          <h2 className="subtitulo">Prueba con una categoría</h2>
          <Categorias />
        </>
      )}

      {cocinas.length > 0 && (
        <>
          <h2 className="subtitulo">Cocinas</h2>
          <div className="grilla-restaurantes">
            {cocinas.map((restaurante) => (
              <RestauranteCard key={restaurante.id} restaurante={restaurante} />
            ))}
          </div>
        </>
      )}

      {encontrados.length > 0 && (
        <>
          <h2 className="subtitulo">Platos</h2>
          <div className="grilla-platos">
            {encontrados.map((plato) => (
              <PlatoCard key={plato.id} plato={plato} mostrarCocina />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
