"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const GetCurrentUserQuery_1 = require("../../../../modules/auth/application/queries/GetCurrentUserQuery");
class AuthenticationMiddleware {
    jwtProvider;
    getCurrentUserHandler;
    constructor(jwtProvider, getCurrentUserHandler) {
        this.jwtProvider = jwtProvider;
        this.getCurrentUserHandler = getCurrentUserHandler;
    }
    authenticate = async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'Missing or invalid token' }] });
        }
        const token = authHeader.split(' ')[1];
        try {
            const userId = this.jwtProvider.verifyToken(token);
            const user = await this.getCurrentUserHandler.handle(new GetCurrentUserQuery_1.GetCurrentUserQuery(userId));
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'Invalid or expired token' }] });
        }
    };
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=AuthenticationMiddleware.js.map