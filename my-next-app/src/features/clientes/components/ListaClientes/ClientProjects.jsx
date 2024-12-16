//Librerias react/next
import { useEffect, useState } from 'react';
//Componentes
import ClientProjectsEmpty from './ClientProjectsEmpty';
//Funciones
import { getProjectsOfCliente } from '../../api/clientesRequests';
import { formatDate } from '@/api/main.js';
//Componentes
import LoadingSpinner from '@/components/LoadingSpinner';

const cabecera = ['Num.', 'Nombre', 'Código', 'Fecha', 'Estado'];
const projectsProperties = ['index', 'name', 'code', 'createdAt', 'active'];

/**
 * Lista de proyectos de un cliente
 * @param {dict} client - Diccionario con la informacion del cliente
 * @returns {JSX.Element}
 */
const ClientProjects = ({ client }) => {
  //Estado que gestiona los proyectos del cliente
  const [projects, setProjects] = useState([]);
  //Estado que gestiona si se esta cargando la informacion
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        let projects = await getProjectsOfCliente(client._id);
        setProjects(projects);
      } catch (error) {
        console.error('Error en fetchProjects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [client]);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (projects.length === 0) {
    return <ClientProjectsEmpty />;
  }
  return (
    <div className="border-l border-b w-full h-[40%] pl-[1vw]">
      <div className="w-full h-[15%] flex mt-[1vh]">
        <h1 className="font-bold text-xl">Proyectos</h1>
      </div>
      <div className="border w-full h-[20%] flex">
        {cabecera.map((item, index) => (
          <div
            key={index}
            className={`border-l pl-[0.5vw] h-full flex items-center ${item === 'Nombre' ? 'w-[28%]' : 'w-[18%]'}`}
          >
            <h1>{item}</h1>
          </div>
        ))}
      </div>
      <div className="border w-full h-[60%] overflow-y-auto custom-scrollbar">
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="border-b flex w-full h-[33%]">
            {projectsProperties.map((property, propertyIndex) => (
              <div
                key={propertyIndex}
                className={`border-l pl-[0.5vw] h-full flex items-center ${property === 'name' ? 'w-[28%]' : 'w-[18%]'}`}
              >
                {property === 'index' ? (
                  <h1>{projectIndex + 1}</h1>
                ) : property === 'createdAt' ? (
                  <h1>{formatDate(project[property])}</h1>
                ) : property === 'active' ? (
                  <h1 className="bg-green-50 text-green-600">Active</h1>
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

export default ClientProjects;
