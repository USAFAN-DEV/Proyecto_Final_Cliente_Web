import { useState, useEffect } from 'react';
import { getClientById, getProyectoById } from '../../api/albaranesRequests';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ListaAlbaranesDescargar, ListaAlbaranesSearchBar } from './ListaAlbaranesComponentes';

const cabecera = ['Formato', 'Material', 'Descripcion', 'Proyecto', 'Cliente'];
const albaranesProperties = ['format', 'material', 'description', 'projectId', 'clientId'];

/**
 * Componente que muestra la lista de proyectos asociados a un usuario.
 * @param {Object[]} albaranes - Array de diccionarios con atributos de un proyecto.
 * @returns
 */
const ProyectosList = ({ albaranes, selectedAlbaranes, setSelectedAlbaranes }) => {
  const [clients, setClients] = useState({});
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientPromises = albaranes.map(async (albaran) => {
          const client = await getClientById(albaran.clientId);
          return { id: albaran.clientId, data: client };
        });

        const projectPromises = albaranes.map(async (albaran) => {
          const project = await getProyectoById(albaran.projectId._id); //! Revisar
          return { id: albaran.projectId, data: project };
        });

        const clientsData = await Promise.all(clientPromises);
        const projectsData = await Promise.all(projectPromises);

        const clientsMap = clientsData.reduce((acc, client) => {
          acc[client.id] = client.data;
          return acc;
        }, {});

        const projectsMap = projectsData.reduce((acc, project) => {
          acc[project.id] = project.data;
          return acc;
        }, {});

        setClients(clientsMap);
        setProjects(projectsMap);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albaranes]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAlbaranes(albaranes.map((albaran) => albaran._id));
    } else {
      setSelectedAlbaranes([]);
    }
  };

  const handleSelectProject = (_id) => {
    setSelectedAlbaranes((prevSelected) =>
      prevSelected.includes(_id) ? prevSelected.filter((albaran_id) => albaran_id !== _id) : [...prevSelected, _id]
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full">
      <div className="border-t w-full h-[8vh] flex items-center ">
        <ListaAlbaranesSearchBar />
        <ListaAlbaranesDescargar selectedAlbaranes={selectedAlbaranes} />
      </div>
      <div className="border w-full h-[8vh] flex">
        <div className="h-full flex items-center justify-center w-[8%]">
          <input
            type="checkbox"
            id="checkbox1"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onChange={handleSelectAll}
            checked={selectedAlbaranes.length === albaranes.length}
          />
        </div>
        {cabecera.map((item, index) => (
          <div
            key={index}
            className={`pl-[0.5vw] h-full flex items-center ${item === 'Cliente' || item === 'Proyecto' ? 'w-[22%]' : 'w-[16%]'}`}
          >
            <h1>{item}</h1>
          </div>
        ))}
      </div>
      <div className="w-full h-[85%] overflow-y-auto custom-scrollbar">
        {albaranes.map((albaran, albaranIndex) => (
          <div key={albaran._id} className="border-b border-l border-r flex w-full h-[8vh]">
            <div className="border h-full flex items-center justify-center w-[8%]">
              <input
                type="checkbox"
                id={`checkbox-${albaran._id}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                onChange={() => handleSelectProject(albaran._id)}
                checked={selectedAlbaranes.includes(albaran._id)}
              />
            </div>
            {albaranesProperties.map((property, propertyIndex) => (
              <div
                key={`${albaran._id}-${propertyIndex}`}
                className={`border pl-[0.5vw] h-full flex items-center ${property == 'clientId' || property == 'projectId' ? 'w-[22%]' : 'w-[16%]'}`}
              >
                {property === 'projectId' ? (
                  <h1>{projects[albaran.projectId]?.name || 'Cargando...'}</h1>
                ) : property === 'clientId' ? (
                  clients[albaran.clientId] ? (
                    <div className="flex items-center">
                      <img
                        src={clients[albaran.clientId]?.logo || ''}
                        alt="Logo Cliente"
                        className="w-[16%] rounded-full mr-2"
                        style={{ aspectRatio: 1 }}
                      />
                      <h1 className="ml-[3%]">{clients[albaran.clientId]?.name}</h1>
                    </div>
                  ) : (
                    <h1>Cargando...</h1>
                  )
                ) : (
                  <h1>{albaran[property] || 'N/A'}</h1>
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
