import { z } from 'zod';
export interface RegisterUserRequestDTO {
    email: string;
    password: string;
    username: string;
}
export declare const RegisterUserRequestDTOSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodString;
}, z.core.$strip>;
