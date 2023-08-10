import { getAllTypes } from '@/requests';
import { useEffect, useState } from 'react';

export const useTypesData = () => {
  const [typesData, setTypesData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTypes();
        setTypesData(data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { typesData, isLoading, error };
};
