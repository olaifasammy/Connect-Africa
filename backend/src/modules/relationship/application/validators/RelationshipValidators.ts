import { z } from 'zod';

export const CreateRelationshipSchema =
  z
    .object({
      sourceEntityId: z.string().uuid(),
      targetEntityId: z.string().uuid(),
      relationshipTypeId: z.string().uuid(),
    })
    .strict()
    .refine(
      (data) =>
        data.sourceEntityId !==
        data.targetEntityId,
      {
        message:
          'Source and target entity cannot be the same.',
        path: ['targetEntityId'],
      },
    );

export const UpdateRelationshipSchema =
  z
    .object({
      relationshipTypeId: z.string().uuid(),
    })
    .strict();

export const ListRelationshipQuerySchema =
  z
    .object({
      limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(50),
      offset: z.coerce
        .number()
        .int()
        .min(0)
        .default(0),
    })
    .strict();
