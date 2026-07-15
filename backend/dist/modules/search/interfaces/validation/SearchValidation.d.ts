import { z } from 'zod';
export declare const SearchRequestSchema: z.ZodObject<{
    query: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    sortBy: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"relevance">, z.ZodLiteral<"alphabetical">, z.ZodLiteral<"dateCreated">, z.ZodLiteral<"dateUpdated">, z.ZodLiteral<"popularity">]>>;
    sortOrder: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"asc">, z.ZodLiteral<"desc">]>>;
    includeFacets: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
