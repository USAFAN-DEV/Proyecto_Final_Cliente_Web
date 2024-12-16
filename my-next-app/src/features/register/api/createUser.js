/**
 * Crea un nuevo usuario en la API.
 * @async
 * @param {Object} user - Datos del usuario a crear.
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene los datos del usuario creado.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
//! 409 ya existe el usuario?
export async function createUser(userData) {
  const bodyRequest = {
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    });

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al crear usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

export async function verifyUser(data) {
  const bodyRequest = {
    code: data.code,
  };
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyRequest),
    });

    // Si la respuesta no es correcta, lanzamos un error
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en verifyUser:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}
