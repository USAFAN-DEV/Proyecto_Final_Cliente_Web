/**
 * Función para registrar el método y el cuerpo de la solicitud.
 * @param {string} method - El método HTTP utilizado.
 * @param {string} url - La URL de la solicitud.
 * @param {Object} [body] - El cuerpo de la solicitud (opcional).
 */
export function logRequest(method, url, body) {
  console.log(`Método: ${method}, URL: ${url}`);
  if (body) {
    console.log(`Cuerpo de la solicitud: ${JSON.stringify(body, null, 2)}`);
  }
}

/**
 * Formatea una fecha ISO en una cadena legible.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const meses = [
    'enero',
    'eebrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${meses.indexOf(month)}/${year}, ${hours}:${minutes}`;
}
