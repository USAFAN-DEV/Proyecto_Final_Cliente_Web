//Contextos
import { ClienteProvider } from '@/features/clientes/components/ClienteContext';
//Componenntes
import CrearProyectoForm from './CrearProyectoForm';
import CrearProyectoSeleccionarClienteForm from './CrearProyectoSeleccionarClienteForm';
/**
 * Componente que muestra el contenido de la página de Crear Proyecto.
 * @returns
 */
const CrearProyectoContent = ({ cliente }) => {
  return (
    <div className="h-full w-full flex flex-row">
      <CrearProyectoForm cliente={cliente} />
      <ClienteProvider>
        <CrearProyectoSeleccionarClienteForm />
      </ClienteProvider>
    </div>
  );
};

export default CrearProyectoContent;

/**
 * <ClienteProvider>
      <CrearProyectoSeleccionarClienteForm />
    </ClienteProvider>
 */
