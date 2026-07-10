import { Request, Response } from 'express';
import { authRateLimiter } from '@interfaces/http/middleware/RateLimitMiddleware';

describe('Rate Limiter', () => {
  const createMockReqRes = () => {
    const req = {
      ip: '127.0.0.1',
      headers: {},
      get: jest.fn().mockImplementation((headerName: string) => {
        const headers: Record<string, string> = {
          'x-forwarded-for': '127.0.0.1',
        };
        return headers[headerName.toLowerCase()];
      }),
      socket: { remoteAddress: '127.0.0.1' },
      app: {
        get: jest.fn().mockReturnValue(false),
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      setHeader: jest.fn(),
      getHeader: jest.fn(),
      end: jest.fn(),
      writableEnded: false,
    } as unknown as Response;
    const next = jest.fn();
    return { req, res, next };
  };

  it('should limit requests', async () => {
    let lastRes: Response | null = null;

    // Mock many requests
    for (let i = 0; i < 101; i++) {
        const { req, res, next } = createMockReqRes();
        await authRateLimiter(req, res, next);
        lastRes = res;
    }
    
    expect(lastRes?.status).toHaveBeenCalledWith(429);
  });
});
