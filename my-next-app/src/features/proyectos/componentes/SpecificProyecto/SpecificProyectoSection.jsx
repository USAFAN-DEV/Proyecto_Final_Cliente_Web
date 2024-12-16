'use client';
import { useState, useEffect } from 'react';
import { getAlbaranesByProjectId } from '../../api/proyectosRequests';
import SpecificProyectoNavbar from './SpecificProyectoNavbar';
import SpecificProyectoListaAlbaranes from './SpecificProyectoListaAlbaranes';
import SpecificProyectoCrearAlbaranForm from './SpecificProyectoCrearAlbaranForm';
import LoadingSpinner from '@/components/LoadingSpinner';

const SpecificProyectoSection = ({ proyecto }) => {
  const [albaranes, setAlbaranes] = useState([]);
  const [activeTab, setActiveTab] = useState('Lista de Albaranes');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (proyecto) {
      const fetchAlbaranes = async () => {
        try {
          setIsLoading(true);
          const albaranes = await getAlbaranesByProjectId(proyecto._id);
          setAlbaranes(albaranes);
          console.log('Albaranes:', albaranes);
        } catch (error) {
          console.error('Error al obtener el proyecto:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAlbaranes();
    }
  }, [proyecto]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <SpecificProyectoNavbar activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="w-full h-[40vh] p-[2vh_1vw]">
        {activeTab === 'Lista de Albaranes' ? (
          <SpecificProyectoListaAlbaranes albaranes={albaranes} />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <SpecificProyectoCrearAlbaranForm proyecto={proyecto} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificProyectoSection;

/**
 * <div className="w-full h-[85%] border p-[2vh_1vw]">
        {activeTab === 'Todos los proyectos' ? (
          <ProyectosProvider>
            <AllProyectosContent />
          </ProyectosProvider>
        ) : (
          <CrearProyectoContent />
        )}
      </div>
 */
