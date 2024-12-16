//Librerias react/next
import { useEffect, useState } from 'react';
//Componentes
import SpecificProyectoListaAlbaranesEmpty from './SpecificProyectoListaAlbaranesEmpty.jsx';
//Componentes
import LoadingSpinner from '@/components/LoadingSpinner';

const cabecera = ['Num.', 'Descripcion', 'Material', 'Fecha', 'Estado'];
const albaranesProperties = ['index', 'description', 'material', 'workdate', 'pending'];

/**
 * Lista de proyectos de un cliente
 * @param {dict} client - Diccionario con la informacion del cliente
 * @returns {JSX.Element}
 */
const SpecificProyectoListaAlbaranes = ({ albaranes }) => {
  if (albaranes.length === 0) {
    return <SpecificProyectoListaAlbaranesEmpty />;
  }
  return (
    <div className="w-full h-full pl-[1vw]">
      <div className="w-full h-[15%] flex mt-[1vh]">
        <h1 className="font-bold text-xl">Albaranes</h1>
      </div>
      <div className="border-t border-r w-full h-[20%] flex">
        {cabecera.map((item, index) => (
          <div
            key={index}
            className={`border-l pl-[0.5vw] h-full flex items-center ${item === 'Descripcion' ? 'w-[28%]' : 'w-[18%]'}`}
          >
            <h1>{item}</h1>
          </div>
        ))}
      </div>
      <div className="border-t border-r w-full h-[60%] overflow-y-auto custom-scrollbar">
        {albaranes.map((albaran, albaranIndex) => (
          <div key={albaranIndex} className="border-b flex w-full h-[33%]">
            {albaranesProperties.map((property, propertyIndex) => (
              <div
                key={propertyIndex}
                className={`border-l pl-[0.5vw] h-full flex items-center ${property === 'description' ? 'w-[28%]' : 'w-[18%]'}`}
              >
                {property === 'index' ? (
                  <h1>{albaranIndex + 1}</h1>
                ) : property === 'pending' ? (
                  <h1 className="bg-green-50 text-green-600">Pendiente</h1>
                ) : (
                  <h1>{albaran[property]}</h1>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificProyectoListaAlbaranes;
