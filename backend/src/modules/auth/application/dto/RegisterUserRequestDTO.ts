import { z } from 'zod';

export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  username: string;
}

export const RegisterUserRequestDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});
