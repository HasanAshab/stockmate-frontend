import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const fetchEnums = async () => {
  const response = await api.get('/api/v1/config/enums');
  return response.data;
};

export const useEnums = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['config-enums'],
    queryFn: fetchEnums,
    staleTime: Infinity, // Enums rarely change
    cacheTime: Infinity,
  });

  return { enums: data || null, isLoading, error };
};
