import { Request, Response } from 'express';
import { AuthController } from '../../../interfaces/AuthController';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { LoginCommand } from '@modules/auth/application/commands/LoginCommand';
import { LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { RegisterUserCommand } from '@modules/auth/application/commands/RegisterUserCommand';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { VerifyEmailCommandHandler } from '@modules/auth/application/handlers/VerifyEmailCommandHandler';
import { UpdateProfileCommandHandler } from '@modules/auth/application/handlers/UpdateProfileCommandHandler';
import { BanUserCommandHandler } from '@modules/auth/application/handlers/BanUserCommandHandler';

describe('AuthController', () => {
  let authController: AuthController;
  let mockLoginHandler: jest.Mocked<ICommandHandler<LoginCommand, string>>;
  let mockLogoutHandler: jest.Mocked<LogoutCommandHandler>;
  let mockRefreshHandler: jest.Mocked<RefreshCommandHandler>;
  let mockRegisterUserHandler: jest.Mocked<ICommandHandler<RegisterUserCommand, void>>;
  let mockResetPasswordHandler: jest.Mocked<ResetPasswordCommandHandler>;
  let mockVerifyEmailHandler: jest.Mocked<VerifyEmailCommandHandler>;
  let mockUpdateProfileHandler: jest.Mocked<UpdateProfileCommandHandler>;
  let mockBanUserHandler: jest.Mocked<BanUserCommandHandler>;

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockLoginHandler = { handle: jest.fn() } as any;
    mockLogoutHandler = { handle: jest.fn() } as any;
    mockRefreshHandler = { handle: jest.fn() } as any;
    mockRegisterUserHandler = { handle: jest.fn() } as any;
    mockResetPasswordHandler = { handle: jest.fn() } as any;
    mockVerifyEmailHandler = { handle: jest.fn() } as any;
    mockUpdateProfileHandler = { handle: jest.fn() } as any;
    mockBanUserHandler = { handle: jest.fn() } as any;

    authController = new AuthController(
      mockLoginHandler,
      mockLogoutHandler,
      mockRefreshHandler,
      mockRegisterUserHandler,
      mockResetPasswordHandler,
      mockVerifyEmailHandler,
      mockUpdateProfileHandler,
      mockBanUserHandler
    );

    mockRequest = {
      body: {},
      ip: '127.0.0.1'
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('login', () => {
    it('should return 200 and a token on successful login', async () => {
      const token = 'fake-token';
      mockLoginHandler.handle.mockResolvedValue(token);
      mockRequest.body = { email: 'test@example.com', password: 'password' };

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: { token } });
      expect(mockResponse.cookie).toHaveBeenCalledWith('token', token, expect.any(Object));
    });

    it('should return 500 on login error', async () => {
      mockLoginHandler.handle.mockRejectedValue(new Error('Login failed'));
      
      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, error: 'Internal Server Error' });
    });
  });

  describe('logout', () => {
    it('should return 204 and clear cookie on successful logout', async () => {
      mockLogoutHandler.handle.mockResolvedValue(undefined);
      mockRequest.cookies = { token: 'old-token' };
      mockRequest.headers = { authorization: 'Bearer old-token' };

      await authController.logout(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('token');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should return 200 and a new token on successful refresh', async () => {
      const newToken = 'new-token';
      mockRefreshHandler.handle.mockResolvedValue(newToken);
      mockRequest.body = { refreshToken: 'old-refresh-token' };

      await authController.refresh(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: newToken });
      expect(mockResponse.cookie).toHaveBeenCalledWith('token', newToken, expect.any(Object));
    });
  });

  describe('verifyEmail', () => {
    it('should return 200 on successful email verification', async () => {
      mockVerifyEmailHandler.handle.mockResolvedValue(undefined);
      mockRequest.body = { userId: 'user-1' };

      await authController.verifyEmail(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('updateProfile', () => {
    it('should return 200 on successful profile update', async () => {
      mockUpdateProfileHandler.handle.mockResolvedValue(undefined);
      mockRequest.body = { displayName: 'New Name' };
      (mockRequest as any).user = { id: 'user-1' };

      await authController.updateProfile(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('banUser', () => {
    it('should return 200 on successful user ban', async () => {
      mockBanUserHandler.handle.mockResolvedValue(undefined);
      mockRequest.body = { userIdToBan: 'user-to-ban' };
      (mockRequest as any).user = { id: 'admin-1' };

      await authController.banUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });
});
