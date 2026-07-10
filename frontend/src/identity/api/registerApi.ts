import apiClient from '@/shared/api/apiClient';

export const register = async (credentials: any): Promise<void> => {
  await apiClient.post('/auth/register', credentials);
};
