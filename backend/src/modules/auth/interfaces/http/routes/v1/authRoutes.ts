import {
  Router,
} from 'express';

import {
  AuthController,
} from '@modules/auth/interfaces/AuthController';

import {
  validate,
} from '@shared/interfaces/http/middleware/ZodValidationMiddleware';

import {
  RegisterSchema,
  LoginSchema,
  RefreshSchema,
  ResetPasswordSchema,
  VerifyEmailSchema,
  UpdateProfileSchema,
  ActivateAccountSchema,
  DisableAccountSchema,
  BanUserSchema,
  SuspendUserSchema,
  RestoreAccountSchema,
  AssignRoleSchema,
  RemoveRoleSchema,
  UnlockUserSchema,
  EnableAccountSchema,
  ChangePasswordSchema,
  ChangeEmailSchema,
  VerifyMfaSchema,
  ResetMfaSchema,
  UnbanUserSchema,
} from '@shared/interfaces/http/schemas/AuthSchemas';

import {
  authorize,
  authorizeRole,
} from '@shared/interfaces/http/middleware/AuthorizationMiddleware';

import {
  Permission,
} from '@modules/auth/domain/policies/rbac/Permissions';

import {
  Roles,
} from '@modules/auth/domain/policies/rbac/Role';

import {
  authRateLimiter,
} from '@shared/interfaces/http/middleware/RateLimitMiddleware';

import {
  AuthenticationMiddleware,
} from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export const authRoutes = (
  authController: AuthController,
  authMiddleware: AuthenticationMiddleware,
) => {
  const router = Router();

  router.post(
    '/register',
    authRateLimiter,
    validate(RegisterSchema),
    (req, res) =>
      authController.register(req, res),
  );

  router.post(
    '/login',
    authRateLimiter,
    validate(LoginSchema),
    (req, res) =>
      authController.login(req, res),
  );

  router.post(
    '/logout',
    authMiddleware.authenticate,
    (req, res) =>
      authController.logout(req, res),
  );

  router.post(
    '/refresh',
    authRateLimiter,
    validate(RefreshSchema),
    (req, res) =>
      authController.refresh(req, res),
  );

  router.post(
    '/reset-password',
    authRateLimiter,
    validate(ResetPasswordSchema),
    (req, res) =>
      authController.resetPassword(req, res),
  );

  router.post(
    '/verify-email',
    authRateLimiter,
    validate(VerifyEmailSchema),
    (req, res) =>
      authController.verifyEmail(req, res),
  );

  router.put(
    '/profile',
    authMiddleware.authenticate,
    validate(UpdateProfileSchema),
    (req, res) =>
      authController.updateProfile(req, res),
  );

  router.post(
    '/ban',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(BanUserSchema),
    (req, res) =>
      authController.banUser(req, res),
  );

  router.post(
    '/suspend',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(SuspendUserSchema),
    (req, res) =>
      authController.suspendUser(req, res),
  );

  router.post(
    '/restore',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(RestoreAccountSchema),
    (req, res) =>
      authController.restoreUser(req, res),
  );

  router.post(
    '/assign-role',
    authMiddleware.authenticate,
    authorize(Permission.ROLE_MANAGE),
    authRateLimiter,
    validate(AssignRoleSchema),
    (req, res) =>
      authController.assignRole(req, res),
  );

  router.post(
    '/remove-role',
    authMiddleware.authenticate,
    authorize(Permission.ROLE_MANAGE),
    authRateLimiter,
    validate(RemoveRoleSchema),
    (req, res) =>
      authController.removeRole(req, res),
  );

  router.post(
    '/disable',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(DisableAccountSchema),
    (req, res) =>
      authController.disableAccount(req, res),
  );

  router.get(
    '/users',
    authMiddleware.authenticate,
    authorize(Permission.USER_READ),
    (req, res) =>
      authController.listUsers(req, res),
  );

  router.post(
    '/search',
    authMiddleware.authenticate,
    authorize(Permission.USER_READ),
    (req, res) =>
      authController.searchUsers(req, res),
  );

  router.post(
    '/activate',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(ActivateAccountSchema),
    (req, res) =>
      authController.activateAccount(req, res),
  );

  router.post(
    '/change-password',
    authMiddleware.authenticate,
    validate(ChangePasswordSchema),
    (req, res) =>
      authController.changePassword(req, res),
  );

  router.delete(
    '/delete-account',
    authMiddleware.authenticate,
    (req, res) =>
      authController.deleteAccount(req, res),
  );

  router.post(
    '/change-email',
    authMiddleware.authenticate,
    validate(ChangeEmailSchema),
    (req, res) =>
      authController.changeEmail(req, res),
  );

  router.get(
    '/sessions',
    authMiddleware.authenticate,
    (req, res) =>
      authController.listSessions(req, res),
  );

  router.delete(
    '/sessions',
    authMiddleware.authenticate,
    (req, res) =>
      authController.revokeAllSessions(req, res),
  );

  router.delete(
    '/sessions/:token',
    authMiddleware.authenticate,
    (req, res) =>
      authController.revokeSession(req, res),
  );

  router.post(
    '/unlock',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(UnlockUserSchema),
    (req, res) =>
      authController.unlockUser(req, res),
  );

  router.post(
    '/enable',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(EnableAccountSchema),
    (req, res) =>
      authController.enableAccount(req, res),
  );

  router.post(
    '/enable-mfa',
    authMiddleware.authenticate,
    authRateLimiter,
    (req, res) =>
      authController.enableMfa(req, res),
  );

  router.post(
    '/verify-mfa',
    authMiddleware.authenticate,
    authRateLimiter,
    validate(VerifyMfaSchema),
    (req, res) =>
      authController.verifyMfa(req, res),
  );

  router.post(
    '/reset-mfa',
    authMiddleware.authenticate,
    authorizeRole(Roles.ADMIN),
    authRateLimiter,
    validate(ResetMfaSchema),
    (req, res) =>
      authController.resetMfa(req, res),
  );

  router.post(
    '/unban',
    authMiddleware.authenticate,
    authorize(Permission.USER_MANAGE),
    authRateLimiter,
    validate(UnbanUserSchema),
    (req, res) =>
      authController.unbanUser(req, res),
  );

  return router;
};
