import { negocio } from '../data/menu.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer-contenido">
        <p className="logo">
          La <em>Gomelería</em>
        </p>
        <p>{negocio.horario}</p>
        <p>{negocio.zona}</p>
      </div>
    </footer>
  )
}
