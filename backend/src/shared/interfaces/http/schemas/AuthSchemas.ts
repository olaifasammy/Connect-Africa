import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RefreshSchema = z.object({
  refreshToken: z.string(),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8),
});

export const VerifyEmailSchema = z.object({
  userId: z.string().uuid(),
});

export const UpdateProfileSchema = z.object({
  displayName: z.string().min(2),
});

