import apiClient from '@/shared/api/apiClient';

export interface UpdateProfileRequest {
  displayName: string;
}

export const updateProfile = async (request: UpdateProfileRequest): Promise<void> => {
  await apiClient.patch('/auth/update-profile', request);
};
