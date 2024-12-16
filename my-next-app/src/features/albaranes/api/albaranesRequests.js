/**
 * Obtiene la lista de albaranes de la API.
 * @async
 * @returns {Promise<Array>} - Una promesa que se resuelve con la respuesta JSON que contiene la lista de albaranes.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function getAlbaranes() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
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
    console.error('Error en getAlbaranes:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

export async function getClientById(clientId) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
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
    console.error('Error en getClientById:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

/**
 * Obtiene un proyecto específico de la API por su ID.
 * @async
 * @param {string} projectId - ID del proyecto a obtener.
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene los datos del proyecto.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function getProyectoById(projectId) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${projectId}`, {
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
    console.error('Error en getProyectoById:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

export async function getDeliveryNote(albaranId) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${albaranId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error en getDeliveryNoteBlob:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}
