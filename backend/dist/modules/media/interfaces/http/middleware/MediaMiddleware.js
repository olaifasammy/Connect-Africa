"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = exports.virusScanHook = exports.validateFile = exports.uploadRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const VirusScannerService_1 = require("../../../../media/infrastructure/processing/VirusScannerService");
exports.uploadRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many uploads from this IP, please try again after 15 minutes',
});
const validateFile = (req, res, next) => {
    const file = req.file;
    if (!file)
        return res.status(400).json({ error: 'No file uploaded' });
    const buffer = file.buffer;
    const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
    const isGif = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38;
    if (!isJpeg && !isPng && !isGif) {
        return res.status(400).json({ error: 'Invalid file signature' });
    }
    next();
};
exports.validateFile = validateFile;
const virusScanHook = async (req, res, next) => {
    const file = req.file;
    if (!file)
        return next();
    const scanner = new VirusScannerService_1.VirusScannerService(); // TODO: Inject via Dependency Injection container
    const isClean = await scanner.scan(file.buffer);
    if (!isClean) {
        return res.status(400).json({ error: 'Virus detected in file' });
    }
    next();
};
exports.virusScanHook = virusScanHook;
const authenticate = (req, res, next) => {
    // Logic to authenticate
    next();
};
exports.authenticate = authenticate;
const authorize = (roles) => (req, res, next) => {
    // Logic to authorize based on roles
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=MediaMiddleware.js.map