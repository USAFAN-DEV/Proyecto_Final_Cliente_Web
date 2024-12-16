import { formatDate } from '@/api/main.js';
import { useState, useEffect } from 'react';
import { getClientById } from '../../api/proyectosRequests';
const cabecera = ['Código', 'Nombre', 'Fecha', 'Estado', 'Cliente'];
const projectsProperties = ['code', 'name', 'createdAt', 'active', 'clientId'];

/**
 * Componente que muestra la lista de proyectos asociados a un usuario.
 * @param {Object[] } proyectos - Array de diccionarios con atributos de un proyecto.
 * @returns
 */
const ProyectosList = ({ proyectos, selectedProjects, setSelectedProjects }) => {
  const [clients, setClients] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = {};
      for (const project of proyectos) {
        if (project.clientId && !clientsData[project.clientId]) {
          try {
            const client = await getClientById(project.clientId);
            clientsData[project.clientId] = client;
          } catch (error) {
            console.error('Error en fetchClients:', error);
          }
        }
      }
      setClients(clientsData);
    };

    fetchClients();
  }, [proyectos]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProjects(proyectos.map((project) => project._id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelectProject = (_id) => {
    setSelectedProjects((prevSelected) =>
      prevSelected.includes(_id) ? prevSelected.filter((project_id) => project_id !== _id) : [...prevSelected, _id]
    );
  };

  return (
    <div className="w-full h-full">
      <div className="border w-full h-[8vh] flex">
        <div className="h-full flex items-center justify-center w-[8%]">
          <input
            type="checkbox"
            id="checkbox1"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onChange={handleSelectAll}
            checked={selectedProjects.length === proyectos.length}
          />
        </div>
        {cabecera.map((item, index) => (
          <div key={index} className={` pl-[0.5vw] h-full flex items-center ${item === 'Nombre' ? 'w-[22%]' : 'w-[16%]'}`}>
            <h1>{item}</h1>
          </div>
        ))}
      </div>
      <div className="w-full h-[85%] overflow-y-auto custom-scrollbar">
        {proyectos.map((project, projectIndex) => (
          <div key={projectIndex} className="border-b border-l border-r flex w-full h-[8vh]">
            <div className=" h-full flex items-center justify-center w-[8%]">
              <input
                type="checkbox"
                id="checkbox1"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                onChange={() => handleSelectProject(project._id)}
                checked={selectedProjects.includes(project._id)}
              />
            </div>
            {projectsProperties.map((property, propertyIndex) => (
              <div
                key={propertyIndex}
                className={` pl-[0.5vw] h-full flex items-center ${property === 'name' || property == 'clientId' ? 'w-[22%]' : 'w-[16%]'}`}
              >
                {property === 'createdAt' ? (
                  <h1>{formatDate(project[property])}</h1>
                ) : property === 'active' ? (
                  <h1 className="bg-green-50 text-green-600">Active</h1>
                ) : property === 'clientId' ? (
                  clients[project.clientId] ? (
                    <div className="flex items-center">
                      <img
                        src={clients[project.clientId].logo}
                        alt="Logo Cliente"
                        className="w-[16%]  rounded-full mr-2"
                        style={{ aspectRatio: 1 }}
                      />
                      <h1 className="ml-[3%]">{clients[project.clientId].name}</h1>
                    </div>
                  ) : (
                    <h1>Cargando...</h1>
                  )
                ) : (
                  <h1>{project[property]}</h1>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProyectosList;
