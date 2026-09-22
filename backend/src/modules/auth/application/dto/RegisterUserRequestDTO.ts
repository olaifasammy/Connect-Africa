import { z } from 'zod';

export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country?: string;
  termsAccepted?: boolean;
}

export const RegisterUserRequestDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().optional(),
  termsAccepted: z.boolean().optional().default(true),
});
