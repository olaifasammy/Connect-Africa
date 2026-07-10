"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const app_1 = require("../../../config/app");
const AuthErrors_1 = require("../../../modules/auth/domain/errors/AuthErrors");
const AuditLogger_1 = require("../../../modules/auth/infrastructure/AuditLogger");
class JwtProvider {
    secret = app_1.appConfig.jwt.secret;
    expiration = app_1.appConfig.jwt.expiration;
    generateToken(userId) {
        const token = jwt.sign({ userId }, this.secret, { expiresIn: this.expiration });
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: 'TOKEN_GENERATION',
            resource: 'AUTH',
            status: 'SUCCESS'
        });
        return token;
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded.userId;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: 'UNKNOWN',
                action: 'TOKEN_VERIFICATION',
                resource: 'AUTH',
                status: 'FAILURE'
            });
            throw new AuthErrors_1.AuthenticationError('Invalid or expired token');
        }
    }
}
exports.JwtProvider = JwtProvider;
//# sourceMappingURL=JwtProvider.js.map