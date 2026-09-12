import {
  z,
} from 'zod';

const uuidSchema =
  z.string().uuid();

const roleSchema =
  z.enum([
    'USER',
    'EDITOR',
    'MODERATOR',
    'ADMIN',
  ]);

const mfaCodeSchema =
  z
    .string()
    .regex(
      /^\d{6}$/,
      'MFA code must be exactly 6 digits',
    );

export const RegisterSchema =
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

export const LoginSchema =
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    mfaCode:
      mfaCodeSchema.optional(),
  });

export const RefreshSchema =
  z.object({
    refreshToken:
      z.string().trim().min(1).optional(),
  });

export const ResetPasswordSchema =
  z.object({
    email: z.string().email(),
    newPassword: z.string().min(8),
    resetToken:
      z.string().trim().min(1),
  });

export const VerifyEmailSchema =
  z.object({
    userId: uuidSchema,
    token:
      z.string().trim().min(1),
  });

export const UpdateProfileSchema =
  z.object({
    displayName:
      z.string().min(2).max(100),
    bio:
      z.string().max(2000).optional(),
    avatarUrl:
      z.string().url().max(2048).optional(),
  });

export const ActivateAccountSchema =
  z.object({
    userId: uuidSchema,
  });

export const DisableAccountSchema =
  z.object({
    userId: uuidSchema,
  });

export const BanUserSchema =
  z.object({
    userIdToBan: uuidSchema,
  });

export const SuspendUserSchema =
  z.object({
    userIdToSuspend: uuidSchema,
  });

export const RestoreAccountSchema =
  z.object({
    userId: uuidSchema,
  });

export const AssignRoleSchema =
  z.object({
    userId: uuidSchema,
    role: roleSchema,
  });

export const RemoveRoleSchema =
  z.object({
    userId: uuidSchema,
    role: roleSchema,
  });

export const UnlockUserSchema =
  z.object({
    userId: uuidSchema,
  });

export const EnableAccountSchema =
  z.object({
    userId: uuidSchema,
  });

export const UnbanUserSchema =
  z.object({
    userId: uuidSchema,
  });

export const ChangePasswordSchema =
  z.object({
    currentPassword:
      z.string().min(8),
    newPassword:
      z.string().min(8),
  });

export const ChangeEmailSchema =
  z.object({
    newEmail:
      z.string().email(),
  });

export const VerifyMfaSchema =
  z.object({
    code: mfaCodeSchema,
  });

export const ResetMfaSchema =
  z.object({
    userId: uuidSchema,
  });
