import rateLimit from 'express-rate-limit';

export const AiRateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many AI requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
