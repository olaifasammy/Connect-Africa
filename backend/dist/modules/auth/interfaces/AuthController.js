"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const BaseController_1 = require("../../../shared/interfaces/http/controllers/BaseController");
const LoginCommand_1 = require("../../auth/application/commands/LoginCommand");
const LogoutCommandHandler_1 = require("../../auth/application/handlers/LogoutCommandHandler");
const RefreshCommandHandler_1 = require("../../auth/application/handlers/RefreshCommandHandler");
const Logger_1 = require("../../../shared/logger/Logger");
const RegisterUserCommand_1 = require("../../auth/application/commands/RegisterUserCommand");
const ResetPasswordCommand_1 = require("../../auth/application/commands/ResetPasswordCommand");
class AuthController extends BaseController_1.BaseController {
    loginHandler;
    logoutHandler;
    refreshHandler;
    registerUserHandler;
    resetPasswordHandler;
    constructor(loginHandler, logoutHandler, refreshHandler, registerUserHandler, resetPasswordHandler) {
        super();
        this.loginHandler = loginHandler;
        this.logoutHandler = logoutHandler;
        this.refreshHandler = refreshHandler;
        this.registerUserHandler = registerUserHandler;
        this.resetPasswordHandler = resetPasswordHandler;
    }
    async register(req, res) {
        try {
            Logger_1.logger.info('Register request received', { email: req.body.email });
            const { email, password } = req.body;
            await this.registerUserHandler.handle(new RegisterUserCommand_1.RegisterUserCommand(email, password));
            res.status(201).json({ success: true });
        }
        catch (error) {
            Logger_1.logger.error('Register error', { error: error.message });
            this.handleError(res, error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.loginHandler.handle(new LoginCommand_1.LoginCommand(email, password));
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 hour
            });
            res.status(200).json({ success: true, data: { token } });
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async logout(req, res) {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || '';
        const userId = req.user?.id || '';
        await this.logoutHandler.handle(new LogoutCommandHandler_1.LogoutCommand(token, userId));
        res.clearCookie('token');
        res.status(204).send();
    }
    async refresh(req, res) {
        const { refreshToken } = req.body;
        const userId = req.user?.id || '';
        const token = await this.refreshHandler.handle(new RefreshCommandHandler_1.RefreshCommand(refreshToken, userId));
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({ token });
    }
    async resetPassword(req, res) {
        try {
            const { email, newPassword } = req.body;
            const ipAddress = req.ip || '';
            await this.resetPasswordHandler.handle(new ResetPasswordCommand_1.ResetPasswordCommand(email, newPassword, ipAddress));
            res.status(200).json({ success: true });
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async execute(req, res) {
        // Legacy mapping or specific endpoint logic
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map