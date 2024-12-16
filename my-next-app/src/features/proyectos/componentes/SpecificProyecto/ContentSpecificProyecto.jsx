'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProyectoById, getClientById } from '@/features/proyectos/api/proyectosRequests';
import LoadingSpinner from '@/components/LoadingSpinner';
import SpecificProyectoInfo from './SpecificProyectoInfo';
import SpecificProyectoSection from './SpecificProyectoSection';
import SpecificProyectoCliente from './SpecificProyectoCliente';

const ContentSpecificProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProyecto = async () => {
        try {
          const proyecto = await getProyectoById(id);
          setProyecto(proyecto);
          const cliente = await getClientById(proyecto.clientId);
          setCliente(cliente);
          console.log('proyecto:', proyecto);
        } catch (error) {
          console.error('Error al obtener el proyecto:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProyecto();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-[85%] flex flex-row flex-wrap">
      <div className="w-[50%] h-[35%] border p-[2%]">
        <div className=" w-[full] h-[2vh] mb-[1vh] flex items-center ">
          <h1 className="text-2xl font-bold">{proyecto.name}</h1>
        </div>
        <SpecificProyectoInfo proyecto={proyecto} />
      </div>
      <div className="border-t border-r border-b w-[50%] h-[35%]  p-[2%]">
        <SpecificProyectoCliente cliente={cliente} />
      </div>
      <div className="border-r border-l border-b p-[0.5%] w-full h-[70%]">
        <SpecificProyectoSection proyecto={proyecto} />
      </div>
    </div>
  );
};

export default ContentSpecificProyecto;
