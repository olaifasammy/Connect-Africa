"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimitMiddleware_1 = require("@interfaces/http/middleware/RateLimitMiddleware");
describe('Rate Limiter', () => {
    const createMockReqRes = () => {
        const req = {
            ip: '127.0.0.1',
            headers: {},
            get: jest.fn().mockImplementation((headerName) => {
                const headers = {
                    'x-forwarded-for': '127.0.0.1',
                };
                return headers[headerName.toLowerCase()];
            }),
            socket: { remoteAddress: '127.0.0.1' },
            app: {
                get: jest.fn().mockReturnValue(false),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            setHeader: jest.fn(),
            getHeader: jest.fn(),
            end: jest.fn(),
            writableEnded: false,
        };
        const next = jest.fn();
        return { req, res, next };
    };
    it('should limit requests', async () => {
        let lastRes = null;
        // Mock many requests
        for (let i = 0; i < 101; i++) {
            const { req, res, next } = createMockReqRes();
            await (0, RateLimitMiddleware_1.authRateLimiter)(req, res, next);
            lastRes = res;
        }
        expect(lastRes?.status).toHaveBeenCalledWith(429);
    });
});
//# sourceMappingURL=RateLimit.test.js.map