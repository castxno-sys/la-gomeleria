import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { platos, restaurantes, tarifas } from '../data/menu.js'

const CLAVE_PEDIDO = 'gomeleria:pedido'

const PedidoContext = createContext(null)

// El estado es un objeto { idPlato: cantidad }.
function reducer(estado, accion) {
  switch (accion.type) {
    case 'agregar':
      return { ...estado, [accion.id]: (estado[accion.id] ?? 0) + 1 }
    case 'quitar': {
      const cantidad = (estado[accion.id] ?? 0) - 1
      if (cantidad > 0) return { ...estado, [accion.id]: cantidad }
      const { [accion.id]: _, ...resto } = estado
      return resto
    }
    case 'eliminar': {
      const { [accion.id]: _, ...resto } = estado
      return resto
    }
    case 'vaciar':
      return {}
    default:
      return estado
  }
}

function cargarPedido() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PEDIDO)) ?? {}
    const limpio = {}
    for (const { id } of platos) {
      if (Number.isInteger(guardado[id]) && guardado[id] > 0) limpio[id] = guardado[id]
    }
    return limpio
  } catch {
    return {}
  }
}

export function PedidoProvider({ children }) {
  const [cantidades, dispatch] = useReducer(reducer, undefined, cargarPedido)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(cantidades))
    } catch {
      // Sin almacenamiento disponible el pedido solo vive en memoria.
    }
  }, [cantidades])

  const valor = useMemo(() => {
    const items = platos
      .filter((plato) => cantidades[plato.id])
      .map((plato) => ({
        ...plato,
        cantidad: cantidades[plato.id],
        subtotal: plato.precio * cantidades[plato.id],
      }))

    // Los platos del pedido agrupados por la cocina que los prepara.
    const grupos = restaurantes
      .map((restaurante) => ({
        id: restaurante.id,
        nombre: restaurante.nombre,
        tiempo: restaurante.tiempo,
        items: items.filter((item) => item.restauranteId === restaurante.id),
      }))
      .filter((grupo) => grupo.items.length > 0)

    const subtotal = items.reduce((suma, item) => suma + item.subtotal, 0)
    const envioGratis = subtotal >= tarifas.envioGratisDesde

    return {
      items,
      grupos,
      cantidades,
      totalUnidades: items.reduce((suma, item) => suma + item.cantidad, 0),
      subtotal,
      domicilio: items.length === 0 || envioGratis ? 0 : tarifas.domicilio,
      faltaEnvioGratis: Math.max(0, tarifas.envioGratisDesde - subtotal),
      // El pedido sale cuando la cocina más demorada termina.
      tiempo:
        grupos.length > 0
          ? [0, 1].map((indice) => Math.max(...grupos.map((grupo) => grupo.tiempo[indice])))
          : null,
      agregar: (id) => dispatch({ type: 'agregar', id }),
      quitar: (id) => dispatch({ type: 'quitar', id }),
      eliminar: (id) => dispatch({ type: 'eliminar', id }),
      vaciar: () => dispatch({ type: 'vaciar' }),
    }
  }, [cantidades])

  return <PedidoContext.Provider value={valor}>{children}</PedidoContext.Provider>
}

export function usePedido() {
  const contexto = useContext(PedidoContext)
  if (!contexto) throw new Error('usePedido debe usarse dentro de <PedidoProvider>')
  return contexto
}
