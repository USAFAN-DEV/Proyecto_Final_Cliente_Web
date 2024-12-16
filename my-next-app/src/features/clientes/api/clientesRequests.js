import { logRequest } from '@/api/main';

/**
 * Obtiene la lista de clientes de un usuario de la API.
 * @async
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function getClientes() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    logRequest('GET', 'https://bildy-rpmaya.koyeb.app/api/client', null);

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en getClientes:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser capturado por la función que llama
  }
}

/**
 * Divide una dirección en calle, número, código postal y provincia.
 * @param {string} address
 * @returns {Object}
 */
function splitAddress(address) {
  const [street, number, postalCode, province] = address.split(', ');

  return { street, number, postalCode, province };
}

/**
 * Envia un cliente a la API.
 * @async
 * @param {Object} clientData
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function postCliente(clientData) {
  const { name, address, cif } = clientData;
  const { street, number, postalCode, province } = splitAddress(address);

  const requestBody = {
    name,
    cif,
    address: {
      street,
      number: parseInt(number, 10),
      postal: parseInt(postalCode, 10),
      province,
    },
  };

  console.log(requestBody);

  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    logRequest('POST', 'https://bildy-rpmaya.koyeb.app/api/client', requestBody);

    const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en postCliente:', error);
    throw error;
  }
}

/**
 * Actualiza un cliente en la API.
 * @async
 * @param {string} clientId
 * @param {Object} clientData
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function updateCliente(clientId, clientData, clientName) {
  const requestBody = {
    name: clientName,
    address: {
      street: clientData.address.split(', ')[0],
      number: clientData.address.split(', ')[1],
      postal: clientData.postalCode,
      province: clientData.province,
    },
    cif: clientData.cif,
  };

  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    logRequest('PUT', `https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, requestBody);

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en updateCliente:', error);
    throw error;
  }
}

/**
 * Obtiene los proyectos asociados a un cliente.
 * @param {int} clientId
 * @returns
 */
export async function getProjectsOfCliente(clientId) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    logRequest('GET', `https://bildy-rpmaya.koyeb.app/api/project/${clientId}`, null);

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en getProjectsOfClient:', error);
    throw error;
  }
}

export async function setLogoCliente(clientID, data) {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    logRequest('PATCH', `https://bildy-rpmaya.koyeb.app/api/client/logo/${clientID}`, data);

    const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/logo/${clientID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Error al validar usuario');
    }

    return response.json();
  } catch (error) {
    console.error('Error en setLogoClient:', error);
    throw error;
  }
}
