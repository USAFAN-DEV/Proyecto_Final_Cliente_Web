/**
 * Nombre del cliente
 * @param {string} clientName
 * @returns {JSX.Element}
 */
export const ClientInfoClientName = ({ clientName }) => {
  return (
    <div className="h-full flex justify-start items-center ml-[2vw]">
      <h1 className="font-bold text-3xl">{clientName}</h1>
    </div>
  );
};

/**
 * Logo del cliente
 * @param {string} clientLogo
 * @returns {JSX.Element}
 */
export const ClientInfoClientLogo = ({ clientLogo }) => {
  return (
    <div className="relative h-full flex justify-center items-center" style={{ aspectRatio: 1 }}>
      <img className="rounded-full object-cover w-full h-full" src={clientLogo} alt="Logo Cliente" />
    </div>
  );
};
