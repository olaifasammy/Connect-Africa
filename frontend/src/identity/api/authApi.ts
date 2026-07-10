import apiClient from '@/shared/api/apiClient';
import { LoginResponse } from '../types/user';

export const login = async (credentials: any): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return data;
};
