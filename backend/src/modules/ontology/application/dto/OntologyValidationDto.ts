import { z } from 'zod';

export const CreateOntologySchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string(),
});

export const UpdateOntologySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  description: z.string().optional(),
});

export const ArchiveOntologySchema = z.object({
  id: z.string().uuid(),
});

export const CreateEntityTypeSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string(),
});

export const CreateRelationshipTypeSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string(),
  sourceEntityTypeId: z.string().uuid(),
  targetEntityTypeId: z.string().uuid(),
});

export const CreateOntologyVersionSchema = z
  .object({})
  .strict();

const PropertyDataTypeSchema = z.enum([
  'STRING',
  'TEXT',
  'INTEGER',
  'NUMBER',
  'BOOLEAN',
  'DATE',
  'DATETIME',
  'JSON',
]);

const PropertyCardinalitySchema = z
  .number()
  .int()
  .min(0);

export const CreateEntityTypePropertySchema =
  z
    .object({
      name: z.string().trim().min(1).max(255),
      dataType: PropertyDataTypeSchema,
      minCardinality:
        PropertyCardinalitySchema.optional(),
      maxCardinality:
        PropertyCardinalitySchema
          .nullable()
          .optional(),
      required: z.boolean().optional(),
    })
    .superRefine((value, ctx) => {
      const min =
        value.minCardinality ?? 0;

      const max =
        value.maxCardinality ?? null;

      if (
        max !== null &&
        max < min
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maxCardinality'],
          message:
            'Maximum cardinality cannot be less than minimum cardinality.',
        });
      }

      if (
        value.required === true &&
        min < 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['required'],
          message:
            'A required property must have a minimum cardinality of at least 1.',
        });
      }
    });

export const UpdateEntityTypePropertySchema =
  CreateEntityTypePropertySchema;

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

export const EntityTypeIdParamSchema = z.object({
  entityTypeId: z.string().uuid(),
});