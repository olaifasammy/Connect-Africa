import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  IJwtProvider,
} from '@modules/auth/domain/interfaces/IJwtProvider';

import {
  GetCurrentUserQueryHandler,
} from '@modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';

import {
  GetCurrentUserQuery,
} from '@modules/auth/application/queries/GetCurrentUserQuery';

import {
  AccountStatus,
} from '@modules/auth/domain/value-objects/AccountStatus';

import {
  injectable,
  inject,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

@provide(
  AuthenticationMiddleware,
  true,
)
@injectable()
export class AuthenticationMiddleware {
  constructor(
    @inject('IJwtProvider')
    private readonly jwtProvider:
      IJwtProvider,

    private readonly getCurrentUserHandler:
      GetCurrentUserQueryHandler,
  ) {}

  authenticate =
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const authorization =
        req.headers.authorization;

      let token =
        '';

      if (
        authorization?.startsWith(
          'Bearer ',
        )
      ) {
        token =
          authorization
            .slice(7)
            .trim();
      }

      if (
        !token &&
        req.cookies?.accessToken
      ) {
        token =
          req.cookies.accessToken;
      }

      if (!token) {
        res.status(401).json({
          success: false,
          errors: [
            {
              code:
                'UNAUTHORIZED',
              message:
                'Missing authentication token.',
            },
          ],
        });

        return;
      }

      try {
        const userId =
          this.jwtProvider.verifyToken(
            token,
            'ACCESS',
          );

        const user =
          await this.getCurrentUserHandler.handle(
            new GetCurrentUserQuery(
              userId,
            ),
          );

        switch (user.accountStatus) {
          case AccountStatus.PENDING_VERIFICATION:
            res.status(401).json({
              success: false,
              errors: [
                {
                  code:
                    'EMAIL_NOT_VERIFIED',
                  message:
                    'Email verification is required.',
                },
              ],
            });
            return;

          case AccountStatus.DISABLED:
            res.status(401).json({
              success: false,
              errors: [
                {
                  code:
                    'ACCOUNT_DISABLED',
                  message:
                    'Account is disabled.',
                },
              ],
            });
            return;

          case AccountStatus.SUSPENDED:
            res.status(401).json({
              success: false,
              errors: [
                {
                  code:
                    'ACCOUNT_SUSPENDED',
                  message:
                    'Account is suspended.',
                },
              ],
            });
            return;

          case AccountStatus.BANNED:
            res.status(401).json({
              success: false,
              errors: [
                {
                  code:
                    'ACCOUNT_BANNED',
                  message:
                    'Account is banned.',
                },
              ],
            });
            return;

          case AccountStatus.ACTIVE:
            break;

          default:
            res.status(401).json({
              success: false,
              errors: [
                {
                  code:
                    'ACCOUNT_INVALID',
                  message:
                    'Account status is invalid.',
                },
              ],
            });
            return;
        }

        if (user.isLocked()) {
          res.status(401).json({
            success: false,
            errors: [
              {
                code:
                  'ACCOUNT_LOCKED',
                message:
                  'Account is locked.',
              },
            ],
          });

          return;
        }

        req.user =
          user;

        next();
      } catch {
        res.status(401).json({
          success: false,
          errors: [
            {
              code:
                'UNAUTHORIZED',
              message:
                'Invalid or expired access token.',
            },
          ],
        });
      }
    };
}
