import { useMutation } from '@tanstack/react-query';
import { login } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
