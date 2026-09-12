import { z } from 'zod';

const EntityAttributesSchema =
  z.record(
    z.string().trim().min(1),
    z.unknown(),
  );

export const CreateEntitySchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        'Name is required',
      )
      .max(
        255,
        'Name cannot exceed 255 characters',
      ),

    type: z
      .string()
      .trim()
      .min(
        1,
        'Type is required',
      )
      .max(
        255,
        'Type cannot exceed 255 characters',
      ),

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
      .default([]),

    attributes:
      EntityAttributesSchema
        .default({}),
  });

export type CreateEntityRequest =
  z.infer<
    typeof CreateEntitySchema
  >;

export const MergeEntitiesSchema =
  z.object({
    sourceId:
      z.string().uuid(),

    targetId:
      z.string().uuid(),
  });

export const AliasSchema =
  z.object({
    alias: z
      .string()
      .trim()
      .min(
        1,
        'Alias is required',
      )
      .max(
        100,
        'Alias cannot exceed 100 characters',
      ),
  });