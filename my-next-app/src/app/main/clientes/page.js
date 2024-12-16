import ContentClientePage from '@/features/clientes/components/ContentClientePage.jsx';
import { ClienteProvider } from '@/features/clientes/components/ClienteContext';

/**
 * Renderiza la página de clientes
 * @returns {JSX.Element}
 */
const ClientesPage = () => {
  return (
    <ClienteProvider>
      <ContentClientePage />
    </ClienteProvider>
  );
};

export default ClientesPage;
