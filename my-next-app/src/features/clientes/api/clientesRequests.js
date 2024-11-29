/**
 * Obtiene la lista de clientes de la API.
 * @async
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene la lista de clientes.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function getClientes() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    return response.json();
  } catch (error) {
    console.error('Error en getClientes:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}
