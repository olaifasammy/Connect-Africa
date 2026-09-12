import { z } from 'zod';

const StrictPositiveInt = z
  .coerce
  .number()
  .int()
  .positive();

const FiltersSchema = z
  .string()
  .optional()
  .transform((value, ctx) => {
    if (!value) {
      return undefined;
    }

    try {
      const parsed = JSON.parse(value);

      if (
        parsed === null ||
        typeof parsed !== 'object' ||
        Array.isArray(parsed)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Filters must be a JSON object.',
        });

        return z.NEVER;
      }

      return parsed as Record<string, unknown>;
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Filters must contain valid JSON.',
      });

      return z.NEVER;
    }
  });

const CursorSchema = z
  .string()
  .trim()
  .min(1, 'Cursor cannot be empty.')
  .max(4096, 'Cursor cannot exceed 4096 characters.')
  .optional();

export const ListQuerySchema = z
  .object({
    strategy: z
      .enum(['offset', 'cursor'])
      .default('offset'),

    page: StrictPositiveInt
      .default(1)
      .optional(),

    limit: StrictPositiveInt
      .max(100)
      .default(20),

    cursor: CursorSchema,

    sortBy: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional(),

    sortOrder: z
      .enum(['asc', 'desc'])
      .default('asc'),

    filters: FiltersSchema,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.strategy === 'cursor') {
      if (value.page !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['page'],
          message:
            'Page cannot be used with cursor pagination.',
        });
      }

      if (value.sortBy !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sortBy'],
          message:
            'sortBy is not supported with cursor pagination.',
        });
      }

      if (value.sortOrder !== 'asc') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sortOrder'],
          message:
            'sortOrder must be asc with cursor pagination.',
        });
      }
    }

    if (
      value.strategy === 'offset' &&
      value.cursor !== undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cursor'],
        message:
          'Cursor cannot be used with offset pagination.',
      });
    }
  });

export type ListQuery = z.infer<
  typeof ListQuerySchema
>;