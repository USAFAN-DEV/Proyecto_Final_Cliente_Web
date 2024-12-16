'use client';
import { useContext, useState } from 'react';
import { ProyectosContext } from '../ProyectosContext';
import AllProyectosEmpty from './AllProyectosEmpty';
import { AllProyectosNavbarSearchbar, AllProyectosNavbarSee } from './AllProyectosComponents.jsx';
import ProyectosList from './ProyectosList';

/**
 * Componente que muestra la lista de Proyectos asociados a un usuario.
 * @returns {JSX.Element}
 */

const AllProyectosContent = () => {
  /**
   * Estado que controla los proyectos acociados a un usuario.
   */
  const [proyectos, setProyectos] = useContext(ProyectosContext);

  const [selectedProjects, setSelectedProjects] = useState([]);

  return (
    <>
      <div className="w-full h-[12%] flex items-center">
        <AllProyectosNavbarSearchbar />
        <AllProyectosNavbarSee selectedProjects={selectedProjects} />
      </div>
      <div className="w-full h-[88%]">
        {proyectos.length == 0 ? (
          <AllProyectosEmpty />
        ) : (
          <ProyectosList
            proyectos={proyectos}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
          />
        )}
      </div>
    </>
  );
};

export default AllProyectosContent;
