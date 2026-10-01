# La Gomelería · Antojos con clase

Prototipo funcional en React de una app de domicilios al estilo de las plataformas de pedidos: el cliente elige entre varias cocinas, arma su pedido y conoce el total a pagar antes de confirmarlo.

## Cómo ejecutarlo

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install
npm run dev
```

Luego abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Rutas

| Ruta                   | Página                                                                          |
| ---------------------- | ------------------------------------------------------------------------------- |
| `/`                    | Inicio: portada, categorías, promociones, cocinas favoritas y platos más pedidos |
| `/menu`                | Menú: cocinas por categoría (`?categoria=`) y resultados de búsqueda (`?q=`)     |
| `/menu/:restauranteId` | Carta de una cocina, con botones para agregar platos al pedido                   |
| `/pedidos`             | Pedido: cantidades, datos de entrega, pago, propina, total y confirmación        |

## Estructura

```
src/
  main.jsx                   Punto de entrada y BrowserRouter
  App.jsx                    Definición de rutas
  index.css                  Estilos y paleta de colores
  data/menu.js               Negocio, tarifas, categorías, cocinas y platos
  context/PedidoContext.jsx  Estado del pedido (useReducer + localStorage)
  components/                Encabezado, Buscador, Categorias, RestauranteCard,
                             PlatoCard, Cantidad, BarraPedido, Footer…
  pages/                     Inicio, Menu, Restaurante, Pedidos, NoEncontrada
  utils/formato.js           Formato de precios, tiempos y búsqueda
```

## Datos de ejemplo

Las cocinas, los platos, los precios, las calificaciones y las tarifas son inventados y se cambian en `src/data/menu.js`. El domicilio cuesta lo que diga `tarifas.domicilio` y es gratis desde `tarifas.envioGratisDesde`.

El pedido confirmado solo se muestra en pantalla: no se envía a ningún servidor.

`respaldo-el-antojo.zip` guarda la primera versión del proyecto (El Antojo, comidas rápidas).
