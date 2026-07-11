import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile, UpdateProfileRequest } from '../api/userApi';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
