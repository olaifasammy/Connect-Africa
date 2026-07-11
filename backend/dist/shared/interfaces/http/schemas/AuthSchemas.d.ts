import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const RefreshSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export declare const ResetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const VerifyEmailSchema: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
export declare const UpdateProfileSchema: z.ZodObject<{
    displayName: z.ZodString;
}, z.core.$strip>;
