import { z } from 'zod';

const EntityAttributesSchema =
  z.record(
    z.string().trim().min(1),
    z.unknown(),
  );

export const UpdateEntitySchema =
  z
    .object({
      name: z
        .string()
        .trim()
        .min(
          1,
          'Name cannot be empty',
        )
        .max(
          255,
          'Name cannot exceed 255 characters',
        )
        .optional(),

      description: z
        .string()
        .trim()
        .max(
          2000,
          'Description cannot exceed 2000 characters',
        )
        .optional(),

      source: z
        .string()
        .trim()
        .max(
          255,
          'Source cannot exceed 255 characters',
        )
        .optional(),

      tags: z
        .array(
          z
            .string()
            .trim()
            .min(
              1,
              'Tag cannot be empty',
            )
            .max(
              100,
              'Tag cannot exceed 100 characters',
            ),
        )
        .max(
          100,
          'An entity cannot have more than 100 tags',
        )
        .optional(),

      attributes:
        EntityAttributesSchema
          .optional(),
    })
    .refine(
      (value) =>
        Object.keys(value)
          .length > 0,
      'At least one field must be provided for update',
    );

export type UpdateEntityRequest =
  z.infer<
    typeof UpdateEntitySchema
  >;