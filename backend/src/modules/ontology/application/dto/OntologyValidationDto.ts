import { z } from 'zod';

export const CreateOntologySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  version: z.number().int().positive(),
});

export const UpdateOntologySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const ArchiveOntologySchema = z.object({
  id: z.string().uuid(),
});

export const CreateEntityTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  properties: z.array(z.object({
    name: z.string().min(1),
    type: z.string(),
    required: z.boolean(),
  })).optional(),
});

export const CreateRelationshipTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  sourceEntityTypeId: z.string().uuid(),
  targetEntityTypeId: z.string().uuid(),
});

export const CreateOntologyVersionSchema = z.object({
  versionNumber: z.number().int().positive(),
  description: z.string().optional(),
});
