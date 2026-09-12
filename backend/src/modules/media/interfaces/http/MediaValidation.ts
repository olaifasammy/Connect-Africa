import { z } from 'zod';

export const UploadMediaSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
});

export const AttachMediaSchema = z.object({
  resourceType: z.string().min(1),
  resourceId: z.string().uuid(),
});

export const UpdateMediaSchema = z.object({
  fileName: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  status: z.string().optional(),
});

export const ArchiveMediaSchema = z.object({});

export const DeleteMediaSchema = z.object({});

export const GenerateThumbnailSchema = z.object({
  size: z.enum(['small', 'medium', 'large']).optional(),
});

export const MoveMediaSchema = z.object({
  newParentId: z.string().min(1),
});

export const PublishMediaSchema = z.object({});

export const RenameMediaSchema = z.object({
  newName: z.string().min(1),
});

export const RestoreMediaSchema = z.object({});

export const CopyMediaSchema = z.object({
  mediaId: z.string().uuid(),
  destinationPath: z.string().min(1),
});

export const GetMediaSchema = z.object({
  id: z.string().uuid(),
});

export const SearchMediaSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().positive().default(10),
  offset: z.number().int().nonnegative().default(0),
});

export const GetMediaByArticleSchema = z.object({
  articleId: z.string().uuid(),
});

export const GetMediaByEntitySchema = z.object({
  entityId: z.string().uuid(),
});

export const GetMediaUsageSchema = z.object({
  mediaId: z.string().uuid(),
});
