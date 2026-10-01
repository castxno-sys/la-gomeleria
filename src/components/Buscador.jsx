import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function Buscador() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [parametros] = useSearchParams()
  const busquedaActual = pathname === '/menu' ? (parametros.get('q') ?? '') : ''
  const [texto, setTexto] = useState(busquedaActual)

  // El campo refleja la búsqueda de la URL y se limpia al salir del menú.
  useEffect(() => {
    setTexto(busquedaActual)
  }, [busquedaActual, pathname])

  function buscar(evento) {
    evento.preventDefault()
    const consulta = texto.trim()
    navigate(consulta ? `/menu?q=${encodeURIComponent(consulta)}` : '/menu')
  }

  return (
    <form className="buscador" role="search" onSubmit={buscar}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m16.5 16.5 4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        aria-label="Buscar platos o cocinas"
        placeholder="Busca sushi, pizza, postres…"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}
