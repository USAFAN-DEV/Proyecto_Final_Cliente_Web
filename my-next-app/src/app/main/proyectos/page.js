import ContentProyectosPage from '@/features/proyectos/componentes/ContentProyectosPage';
import { ProyectosProvider } from '@/features/proyectos/componentes/ProyectosContext';

/**
 * Pagina de proyectos
 * @returns {JSX.Element}
 */
const ProyectosPage = () => {
  return (
    <ProyectosProvider>
      <ContentProyectosPage />
    </ProyectosProvider>
  );
};

export default ProyectosPage;
