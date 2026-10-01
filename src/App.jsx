import { Route, Routes } from 'react-router-dom'
import { PedidoProvider } from './context/PedidoContext.jsx'
import Encabezado from './components/Encabezado.jsx'
import BarraPedido from './components/BarraPedido.jsx'
import Footer from './components/Footer.jsx'
import ScrollArriba from './components/ScrollArriba.jsx'
import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Restaurante from './pages/Restaurante.jsx'
import Pedidos from './pages/Pedidos.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <PedidoProvider>
      <ScrollArriba />
      <Encabezado />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:restauranteId" element={<Restaurante />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
      <BarraPedido />
    </PedidoProvider>
  )
}
