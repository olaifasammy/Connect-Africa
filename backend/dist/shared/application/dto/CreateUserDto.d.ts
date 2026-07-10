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
export declare const CreateUserDtoSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
