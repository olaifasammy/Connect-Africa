import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  z,
} from 'zod';

export const validate =
  (schema: z.ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result =
      schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    req.body = result.data;
    next();
  };

export const validateQuery =
  (schema: z.ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result =
      schema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    if (result.data && typeof result.data === 'object') {
      for (const [key, value] of Object.entries(result.data)) {
        (req.query as Record<string, unknown>)[key] = value;
      }
    }

    next();
  };

export const validateParams =
  (schema: z.ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const result =
      schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    if (result.data && typeof result.data === 'object') {
      for (const [key, value] of Object.entries(result.data)) {
        (req.params as Record<string, unknown>)[key] = value;
      }
    }

    next();
  };
