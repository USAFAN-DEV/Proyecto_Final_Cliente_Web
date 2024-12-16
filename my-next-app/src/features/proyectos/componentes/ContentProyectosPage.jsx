'use client';
import AllProyectosContent from './AllProyectos/AllProyectosContent';
import CrearProyectoContent from './CrearProyecto/CrearProyectoContent';
import ProyectosNavbar from './ProyectosNavbar';
import { ProyectosProvider } from './ProyectosContext';
import { useState } from 'react';
/**
 * Componente que muestra el contenido de la página de proyectos.
 * @returns {JSX.Element}
 */
const ContentProyectosPage = () => {
  /**
   * Estado que controla que contenido se muestra en la página.
   * Posibles valores: 'Todos los proyectos', 'Crear un proyecto'.
   */
  const [activeTab, setActiveTab] = useState('Todos los proyectos');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ProyectosNavbar activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="w-full h-[85%] border p-[2vh_1vw]">
        {activeTab === 'Todos los proyectos' ? (
          <ProyectosProvider>
            <AllProyectosContent />
          </ProyectosProvider>
        ) : (
          <CrearProyectoContent />
        )}
      </div>
    </>
  );
};

export default ContentProyectosPage;
