import { Request, Response } from 'express';
import { authRateLimiter } from '@interfaces/http/middleware/RateLimitMiddleware';

describe('Rate Limiter', () => {
  it('should limit requests', async () => {
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn();

    // Mock many requests
    for (let i = 0; i < 101; i++) {
        await authRateLimiter(req, res, next);
    }
    
    expect(res.status).toHaveBeenCalledWith(429);
  });
});
