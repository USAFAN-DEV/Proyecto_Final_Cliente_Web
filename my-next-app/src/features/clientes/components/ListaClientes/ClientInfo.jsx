import { ClientInfoClientName, ClientInfoClientLogo } from './ClientInfoComponents';
import ClientInfoForm from './ClientInfoForm';

/**
 * Informacion del Cliente
 * @param {dict} client - Diccionario con la informacion del cliente.
 * @returns {JSX.Element}
 */
const ClientInfo = ({ client }) => {
  return (
    <div className="border w-full h-[50vh] p-[2vh_2vw]">
      <div className="w-full h-[30%] flex flex-row items-start">
        <ClientInfoClientLogo clientLogo={client.logo} />
        <ClientInfoClientName clientName={client.name} />
      </div>
      <div className="w-full h-[70%] flex flex-wrap">
        <ClientInfoForm client={client} />
      </div>
    </div>
  );
};

export default ClientInfo;
