'use client';
import { useState, useEffect } from 'react';
import CrearClientePage from './CrearCliente/CrearClientePage';
import ListaClientesPage from './ListaClientes/ListaClientesPage';

const ContentClientePage = () => {
  // Estado para manejar los clientes que hay en la API
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Leer clientes desde localStorage cuando el componente se monta
    const savedClientes = localStorage.getItem('clientes');
    console.log(savedClientes);
    if (savedClientes !== null) {
      setClientes(JSON.parse(savedClientes));
    } else {
      // Inicializar clientes en localStorage si no existe
      localStorage.setItem('clientes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    // Guardar clientes en localStorage cada vez que cambie
    localStorage.setItem('clientes', JSON.stringify(clientes));
    console.log(clientes);
  }, [clientes]);

  return (
    <>
      {clientes.length == 0 ? (
        <CrearClientePage clientes={clientes} setClientes={setClientes} />
      ) : (
        <ListaClientesPage clientes={clientes} />
      )}
    </>
  );
};

export default ContentClientePage;
