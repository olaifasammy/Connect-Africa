import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate query for GET, body for POST/PUT
      const data = req.method === 'GET' ? req.query : req.body;
      schema.parse(data);
      next();
    } catch (err: any) {
      res.status(400).json({ success: false, errors: err.errors });
    }
  };
};
