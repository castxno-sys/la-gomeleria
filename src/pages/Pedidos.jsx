import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cantidad from '../components/Cantidad.jsx'
import { usePedido } from '../context/PedidoContext.jsx'
import { propinas, tarifas } from '../data/menu.js'
import { formatoPrecio, formatoTiempo, plural } from '../utils/formato.js'

const CLAVE_NUMERO = 'gomeleria:ultimo-numero'

const pagos = [
  { id: 'efectivo', nombre: 'Efectivo' },
  { id: 'datafono', nombre: 'Datáfono al recibir' },
]

const estados = ['Confirmado', 'En preparación', 'En camino', 'Entregado']

function siguienteNumero() {
  let numero = 1
  try {
    numero = (Number(localStorage.getItem(CLAVE_NUMERO)) || 0) + 1
    localStorage.setItem(CLAVE_NUMERO, String(numero))
  } catch {
    // Sin almacenamiento disponible la numeración empieza de nuevo.
  }
  return numero
}

export default function Pedidos() {
  const pedido = usePedido()
  const { grupos, subtotal, domicilio, faltaEnvioGratis, tiempo, totalUnidades } = pedido
  const [datos, setDatos] = useState({ nombre: '', direccion: '', indicaciones: '' })
  const [pago, setPago] = useState('efectivo')
  const [propina, setPropina] = useState(0)
  const [errores, setErrores] = useState({})
  const [confirmado, setConfirmado] = useState(null)

  const total = subtotal + domicilio + propina

  function cambiar(evento) {
    const { name, value } = evento.target
    setDatos((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: undefined }))
  }

  function confirmar(evento) {
    evento.preventDefault()
    const faltantes = {}
    if (!datos.nombre.trim()) faltantes.nombre = 'Escribe el nombre de quien recibe.'
    if (!datos.direccion.trim()) faltantes.direccion = 'Escribe la dirección de entrega.'
    if (Object.keys(faltantes).length > 0) {
      setErrores(faltantes)
      document.getElementById(faltantes.nombre ? 'nombre' : 'direccion').focus()
      return
    }
    setConfirmado({
      numero: siguienteNumero(),
      nombre: datos.nombre.trim(),
      direccion: datos.direccion.trim(),
      indicaciones: datos.indicaciones.trim(),
      pago: pagos.find((opcion) => opcion.id === pago).nombre,
      hora: new Date(),
      grupos,
      totalUnidades,
      tiempo,
      subtotal,
      domicilio,
      propina,
      total,
    })
    pedido.vaciar()
  }

  if (confirmado) return <Comprobante pedido={confirmado} />

  if (grupos.length === 0) {
    return (
      <div className="contenedor pagina vacio">
        <span className="vacio-emoji" aria-hidden="true">
          🛍️
        </span>
        <h1>Tu pedido está vacío</h1>
        <p>Agrega platos desde el menú y aquí verás el total a pagar.</p>
        <Link to="/menu" className="boton boton-primario">
          Explorar el menú
        </Link>
      </div>
    )
  }

  return (
    <div className="contenedor pagina">
      <h1>Tu pedido</h1>
      <p className="pagina-intro">
        Revisa los platos y el total antes de confirmar. Entrega estimada: {formatoTiempo(tiempo)}.
      </p>

      <div className="pedido-columnas">
        <section aria-label="Platos del pedido">
          {grupos.map((grupo) => (
            <div key={grupo.id} className="pedido-grupo">
              <h2>
                <Link to={`/menu/${grupo.id}`}>{grupo.nombre}</Link>
              </h2>
              <ul>
                {grupo.items.map((item) => (
                  <li key={item.id} className="pedido-item">
                    <span
                      className="pedido-item-emoji"
                      style={{ background: item.tono }}
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </span>
                    <div className="pedido-item-info">
                      <h3>{item.nombre}</h3>
                      <p>{formatoPrecio(item.precio)} c/u</p>
                    </div>
                    <strong className="pedido-item-subtotal">{formatoPrecio(item.subtotal)}</strong>
                    <div className="pedido-item-acciones">
                      <Cantidad
                        nombre={item.nombre}
                        cantidad={item.cantidad}
                        onSumar={() => pedido.agregar(item.id)}
                        onRestar={() => pedido.quitar(item.id)}
                      />
                      <button
                        type="button"
                        className="enlace enlace-discreto"
                        onClick={() => pedido.eliminar(item.id)}
                        aria-label={`Eliminar ${item.nombre} del pedido`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pedido-lista-pie">
            <Link to="/menu" className="enlace">
              ← Agregar más platos
            </Link>
            <button type="button" className="enlace enlace-discreto" onClick={pedido.vaciar}>
              Vaciar pedido
            </button>
          </div>
        </section>

        <form className="resumen" onSubmit={confirmar} noValidate>
          <h2>Entrega y pago</h2>

          <div className="campo">
            <label htmlFor="nombre">¿Quién recibe?</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              placeholder="Tu nombre"
              value={datos.nombre}
              onChange={cambiar}
              aria-invalid={errores.nombre ? 'true' : undefined}
              aria-describedby={errores.nombre ? 'nombre-error' : undefined}
            />
            {errores.nombre && (
              <p id="nombre-error" className="campo-error" role="alert">
                {errores.nombre}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="direccion">Dirección de entrega</label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              autoComplete="street-address"
              placeholder="Calle, número, apartamento"
              value={datos.direccion}
              onChange={cambiar}
              aria-invalid={errores.direccion ? 'true' : undefined}
              aria-describedby={errores.direccion ? 'direccion-error' : undefined}
            />
            {errores.direccion && (
              <p id="direccion-error" className="campo-error" role="alert">
                {errores.direccion}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="indicaciones">
              Indicaciones <span className="opcional">(opcional)</span>
            </label>
            <textarea
              id="indicaciones"
              name="indicaciones"
              rows="2"
              placeholder="Dejar en portería, sin cebolla…"
              value={datos.indicaciones}
              onChange={cambiar}
            />
          </div>

          <fieldset className="campo opciones">
            <legend>¿Cómo pagas?</legend>
            {pagos.map((opcion) => (
              <label key={opcion.id} className="opcion">
                <input
                  type="radio"
                  name="pago"
                  value={opcion.id}
                  checked={pago === opcion.id}
                  onChange={() => setPago(opcion.id)}
                />
                {opcion.nombre}
              </label>
            ))}
          </fieldset>

          <fieldset className="campo opciones">
            <legend>Propina para el domiciliario</legend>
            {propinas.map((valor) => (
              <label key={valor} className="opcion">
                <input
                  type="radio"
                  name="propina"
                  value={valor}
                  checked={propina === valor}
                  onChange={() => setPropina(valor)}
                />
                {valor === 0 ? 'Sin propina' : formatoPrecio(valor)}
              </label>
            ))}
          </fieldset>

          <p className="aviso-envio">
            {faltaEnvioGratis > 0
              ? `Agrega ${formatoPrecio(faltaEnvioGratis)} más y el domicilio te sale gratis.`
              : `Tienes domicilio gratis por pedir desde ${formatoPrecio(tarifas.envioGratisDesde)}.`}
          </p>

          <dl className="total">
            <div>
              <dt>Subtotal ({plural(totalUnidades, 'producto')})</dt>
              <dd>{formatoPrecio(subtotal)}</dd>
            </div>
            <div>
              <dt>Domicilio</dt>
              <dd>{domicilio === 0 ? 'Gratis' : formatoPrecio(domicilio)}</dd>
            </div>
            <div>
              <dt>Propina</dt>
              <dd>{formatoPrecio(propina)}</dd>
            </div>
            <div className="total-pagar">
              <dt>Total a pagar</dt>
              <dd>{formatoPrecio(total)}</dd>
            </div>
          </dl>

          <button type="submit" className="boton boton-primario boton-ancho">
            Confirmar pedido
          </button>
        </form>
      </div>
    </div>
  )
}

function Comprobante({ pedido }) {
  const numero = String(pedido.numero).padStart(3, '0')
  const hora = pedido.hora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="contenedor pagina">
      <section className="comprobante" aria-labelledby="comprobante-titulo">
        <span className="comprobante-check" aria-hidden="true">
          ✓
        </span>
        <h1 id="comprobante-titulo">¡Pedido confirmado!</h1>
        <p>
          Gracias, {pedido.nombre}. Llega en {formatoTiempo(pedido.tiempo)} a {pedido.direccion}.
        </p>

        <ol className="estados" aria-label="Estado del pedido">
          {estados.map((estado, indice) => (
            <li key={estado} aria-current={indice === 0 ? 'step' : undefined}>
              {estado}
            </li>
          ))}
        </ol>

        <p className="comprobante-numero">
          Pedido <strong>#{numero}</strong>
        </p>
        <p className="comprobante-detalle">
          {hora} · {plural(pedido.totalUnidades, 'producto')} · Pago: {pedido.pago}
        </p>

        <div className="comprobante-lista">
          {pedido.grupos.map((grupo) => (
            <div key={grupo.id}>
              <h2>{grupo.nombre}</h2>
              <ul>
                {grupo.items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.cantidad} × {item.nombre}
                    </span>
                    <span>{formatoPrecio(item.subtotal)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {pedido.indicaciones && (
          <p className="comprobante-notas">Indicaciones: {pedido.indicaciones}</p>
        )}

        <dl className="total">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatoPrecio(pedido.subtotal)}</dd>
          </div>
          <div>
            <dt>Domicilio</dt>
            <dd>{pedido.domicilio === 0 ? 'Gratis' : formatoPrecio(pedido.domicilio)}</dd>
          </div>
          <div>
            <dt>Propina</dt>
            <dd>{formatoPrecio(pedido.propina)}</dd>
          </div>
          <div className="total-pagar">
            <dt>Total a pagar</dt>
            <dd>{formatoPrecio(pedido.total)}</dd>
          </div>
        </dl>

        <div className="comprobante-acciones">
          <Link to="/menu" className="boton boton-primario">
            Hacer otro pedido
          </Link>
          <Link to="/" className="boton boton-borde">
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  )
}
