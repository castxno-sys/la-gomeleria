const moneda = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatoPrecio(valor) {
  return moneda.format(valor)
}

export function formatoTiempo([minimo, maximo]) {
  return `${minimo}–${maximo} min`
}

export function plural(cantidad, singular, pluralTexto = `${singular}s`) {
  return `${cantidad} ${cantidad === 1 ? singular : pluralTexto}`
}

// Minúsculas y sin tildes, para que «limon» encuentre «Limón».
export function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}
