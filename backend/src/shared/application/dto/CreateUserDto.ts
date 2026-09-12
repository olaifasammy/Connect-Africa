import { z } from 'zod';

/**
 * Data Transfer Object for creating a new user.
 */
export interface CreateUserDto {
  email: string;
}

/**
 * Zod schema for CreateUserDto validation.
 */
export const CreateUserDtoSchema = z.object({
  email: z.string().email('Invalid email address'),
});
