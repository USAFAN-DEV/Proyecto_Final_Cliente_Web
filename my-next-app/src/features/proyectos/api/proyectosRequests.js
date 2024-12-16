/**
 * Obtiene la lista de clientes de la API.
 * @async
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene la lista de clientes.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function getProyectos() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
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

function splitAddress(address) {
  const [street, number, postalCode, province] = address.split(', ');

  return { street, number, postalCode, province };
}

export function createRequestBody(name, address, email, CIP, clientId) {
  const { street, number, postalCode, province } = splitAddress(address);

  const requestBody = {
    name, //Sintaxis abreviada de objetos. Es lo mismo que name: name
    code: CIP,
    email,
    address: {
      street,
      number: parseInt(number, 10),
      postal: parseInt(postalCode, 10),
      province: province,
    },
    clientId,
  };

  console.log(requestBody);

  return requestBody;
}

export async function postProyecto(proyectoData, clientId) {
  const { name, address, email, CIP } = proyectoData;
  const requestBody = createRequestBody(name, address, email, CIP, clientId);
  console.log('Request body:', requestBody);
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    return response.json();
  } catch (error) {
    console.error('Error en postProyecto:', error);
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

/**
 * Actualiza un cliente en la API.
 * @async
 * @param {string} clientId - ID del cliente a actualizar.
 * @param {Object} clientData - Datos del cliente a actualizar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene los datos actualizados del cliente.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function updateProject(formData, projectData) {
  const [street, number, postal, province] = formData.address.split(', ');

  const requestBody = {
    name: projectData.name,
    email: projectData.email,
    code: formData.code,
    address: {
      street,
      number,
      postal,
      province,
    },
    clientId: projectData.clientId,
  };

  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${projectData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    return response.json();
  } catch (error) {
    console.error('Error en updateCliente:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

/**
 * Obtiene los albaranes asociados a un proyecto específico por su ID.
 * @async
 * @param {string} projectId - ID del proyecto cuyos albaranes se desean obtener.
 * @returns {Promise<Object>} - Una promesa que se resuelve con la respuesta JSON que contiene la lista de albaranes.
 * @throws {Error} Lanza un error si la respuesta de la red no es correcta o si hay un error en la solicitud fetch.
 */
export async function getAlbaranesByProjectId(projectId) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${projectId}`, {
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
    console.error('Error en getAlbaranesByProjectId:', error);
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

export async function postAlbaran(albaranData, clientId, projectId) {
  const requestBody = {
    ...albaranData,
    clientId,
    projectId,
  };

  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }

    return response.json();
  } catch (error) {
    console.error('Error en postAlbaran:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}
