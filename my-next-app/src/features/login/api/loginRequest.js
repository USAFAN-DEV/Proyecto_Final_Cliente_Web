/**
 * Inicia sesión con el usuario proporcionado.
 * @param {Object} user
 *   @param {string} user.email
 *   @param {string} user.password
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function loginUser(user) {
  try {
    // Fetch a la API api/user/login
    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Se asegura de que el server interprete el body como un JSON
      },
      body: JSON.stringify(user),
    });

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw error; //Rethrow para que lo pueda catchear el componente LoginForm
  }
}
