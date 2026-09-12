import { z } from 'zod';

const SearchContentValueSchema: z.ZodType =
  z.lazy(() =>
    z.union([
      z.string(),
      z.number().finite(),
      z.boolean(),
      z.null(),
      z.array(SearchContentValueSchema),
      z.record(
        z.string(),
        SearchContentValueSchema,
      ),
    ]),
  );

const SearchContentSchema =
  z.record(
    z.string().min(1),
    SearchContentValueSchema,
  );

const SearchResourceTypeSchema =
  z.enum([
    'entity',
    'article',
    'ontology',
    'relationship',
    'source',
    'user',
  ]);

export const SearchQuerySchema =
  z
    .object({
      q:
        z.string()
          .trim()
          .min(1)
          .max(500),

      page:
        z.coerce
          .number()
          .int()
          .min(1)
          .max(10000)
          .optional(),

      limit:
        z.coerce
          .number()
          .int()
          .min(1)
          .max(100)
          .optional(),

      resourceType:
        SearchResourceTypeSchema
          .optional(),

      ontology:
        z.string()
          .trim()
          .min(1)
          .max(200)
          .optional(),

      relationshipType:
        z.string()
          .trim()
          .min(1)
          .max(200)
          .optional(),

      category:
        z.string()
          .trim()
          .min(1)
          .max(200)
          .optional(),

      tags:
        z.string()
          .trim()
          .max(2000)
          .optional(),

      author:
        z.string()
          .trim()
          .min(1)
          .max(200)
          .optional(),

      language:
        z.string()
          .trim()
          .min(1)
          .max(20)
          .optional(),

      dateFrom:
        z.string()
          .datetime()
          .optional(),

      dateTo:
        z.string()
          .datetime()
          .optional(),

      status:
        z.string()
          .trim()
          .min(1)
          .max(100)
          .optional(),

      sortBy:
        z.enum([
          'relevance',
          'alphabetical',
          'dateCreated',
          'dateUpdated',
          'popularity',
        ])
        .optional(),

      sortOrder:
        z.enum([
          'asc',
          'desc',
        ])
        .optional(),
    })
    .strict()
    .refine(
      (data) => {
        if (
          !data.dateFrom ||
          !data.dateTo
        ) {
          return true;
        }

        return (
          new Date(
            data.dateFrom,
          ).getTime() <=
          new Date(
            data.dateTo,
          ).getTime()
        );
      },
      {
        message:
          'dateFrom must not be later than dateTo.',
        path: ['dateFrom'],
      },
    );

export const AutocompleteRequestSchema =
  z
    .object({
      q:
        z.string()
          .trim()
          .min(1)
          .max(200),
    })
    .strict();

export const IndexDocumentSchema =
  z
    .object({
      id:
        z.string().uuid(),

      resourceType:
        SearchResourceTypeSchema,

      resourceId:
        z.string().uuid(),

      content:
        SearchContentSchema,
    })
    .strict();

export const BulkIndexSchema =
  z
    .array(
      IndexDocumentSchema,
    )
    .min(1)
    .max(1000);

export const RebuildIndexSchema =
  z
    .object({
      name:
        z.string()
          .trim()
          .min(1)
          .max(100),
    })
    .strict();

export const DeleteIndexSchema =
  z
    .object({
      id:
        z.string().uuid(),
    })
    .strict();

export const GraphSearchSchema =
  z
    .object({
      query:
        z.string()
          .trim()
          .min(1)
          .max(500),

      depth:
        z.number()
          .int()
          .min(1)
          .max(10)
          .optional(),
    })
    .strict();

export const SuggestionRequestSchema =
  z
    .object({
      q:
        z.string()
          .trim()
          .min(1)
          .max(200),
    })
    .strict();