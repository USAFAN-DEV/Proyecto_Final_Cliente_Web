'use client';

/**
 * Componente que muestra la barra de navegación de proyectos.
 * @returns {JSX.Element}
 */
const SpecificProyectoNavbar = ({ activeTab, handleTabClick }) => {
  const tabs = ['Lista de Albaranes', 'Crear un Albarán'];

  return (
    <div className="w-full h-[7vh] flex flex-row -t mb-[1vh]">
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

export default SpecificProyectoNavbar;
