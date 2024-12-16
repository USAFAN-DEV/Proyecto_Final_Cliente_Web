'use client';
//Librerias react/next
import { useEffect, useState } from 'react';
import Image from 'next/image';
//Funcs
import { setLogoCliente } from '../../api/clientesRequests';

/**
 * Gestiona la subida a la API del logo de un cliente.
 * @param {boolean} uploadLogo - Estado que controla la subida del logo.
 * @param {function} setUploadLogo - Función que actualiza el estado de subida del logo.
 * @returns {JSX.Element}
 */
const CrearClienteLogoCliente = ({ uploadLogo }) => {
  //Estado para controlar la vista previa del logo.
  const [preview, setPreview] = useState(null);
  //Estado para controlar el archivo seleccionado.
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    if (!uploadLogo || !file) return;

    const fetchLogo = async () => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await setLogoCliente(localStorage.getItem('clientID'), formData);
        console.log('Logo seteado:', response);
        localStorage.removeItem('clientID');
      } catch (error) {
        console.error('Error en setLogoClient:', error);
      }
    };

    fetchLogo();
  }, [uploadLogo, file]);

  return (
    <div className="w-full h-[40vh] border-r border-t border-b flex flex-col items-center">
      <div className="w-full h-1/4 flex justify-center items-center">
        <h1 className="text-xl font-bold">Inserta el logo del cliente</h1>
      </div>
      <div className="border relative w-1/3 rounded-full overflow-hidden" style={{ aspectRatio: 1 }}>
        <Image
          src={preview ? preview : '/images/cliente/addImage.png'}
          alt="Logo Cliente"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
        <input
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default CrearClienteLogoCliente;

/**
 * <div className=" w-full h-full bg-black bg-opacity-20 rounded-full"></div>
 */
