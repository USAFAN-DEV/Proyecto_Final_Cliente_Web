'use client';

/**
 * Componente que muestra la barra de navegación de proyectos.
 * @returns {JSX.Element}
 */
const ProyectosNavbar = ({ activeTab, handleTabClick }) => {
  const tabs = ['Todos los proyectos', 'Crear un proyecto'];

  return (
    <div className="w-full h-[8%] flex flex-row border-t">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`h-full w-[15%] flex items-center justify-center ml-[0.5vw] mr-[0.5vw] ${
            activeTab === tab ? 'text-blue-400 border-b border-blue-400' : 'text-black'
          }`}
        >
          <button className="w-full h-full" onClick={() => handleTabClick(tab)}>
            {tab}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProyectosNavbar;
