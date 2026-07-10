import { useMutation } from '@tanstack/react-query';
import { register } from '../api/registerApi';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
