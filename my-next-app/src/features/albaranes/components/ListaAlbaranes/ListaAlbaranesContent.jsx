'use client';
import { useEffect, useState } from 'react';
import { getAlbaranes } from '@/features/albaranes/api/albaranesRequests';
import LoadingSpinner from '@/components/LoadingSpinner';
import ListaAlbaranes from './ListaAlbaranes';

const ListaAlbaranesContent = () => {
  const [albaranes, setAlbaranes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbaranes, setSelectedAlbaranes] = useState([]);

  useEffect(() => {
    const fetchAlbaranes = async () => {
      try {
        const data = await getAlbaranes();
        setAlbaranes(data);
        console.log('Albaranes:', data);
      } catch (error) {
        console.error('Error al obtener los albaranes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbaranes();
  }, []);

  /*useEffect(() => {
    const albaran = {
      _id: '6662b6281b4bb98dab88453f',
      userId: '6661d631b3456d765e39af78',
      clientId: '6662a8c3c199795c88329e4e',
      projectId: '6662afde03013916089bc058',
      format: 'material',
      material: 'wood',
      description: 'my description',
      sign: '/path/to/sign3',
      pending: true,
      createdAt: '2024-06-07T07:26:32.121Z',
      updatedAt: '2024-06-07T07:28:09.444Z',
      __v: 0,
    };

    setAlbaranes([albaran]);
  }, []);*/

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <ListaAlbaranes
        albaranes={albaranes}
        selectedAlbaranes={selectedAlbaranes}
        setSelectedAlbaranes={setSelectedAlbaranes}
      />
    </div>
  );
};

export default ListaAlbaranesContent;
