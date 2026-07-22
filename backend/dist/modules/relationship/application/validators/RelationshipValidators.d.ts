import { z } from 'zod';
export declare const CreateRelationshipSchema: z.ZodObject<{
    sourceEntityId: z.ZodString;
    sourceEntityTypeId: z.ZodString;
    targetEntityId: z.ZodString;
    targetEntityTypeId: z.ZodString;
    relationshipTypeId: z.ZodString;
}, z.core.$strip>;
export declare const UpdateRelationshipSchema: z.ZodObject<{
    relationshipTypeId: z.ZodString;
}, z.core.$strip>;
export declare const CardinalitySchema: z.ZodObject<{
    maxCount: z.ZodNumber;
}, z.core.$strip>;
export declare const ConfidenceSchema: z.ZodObject<{
    score: z.ZodNumber;
}, z.core.$strip>;
export declare const MetadataSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
export declare const TimeRangeSchema: z.ZodObject<{
    start: z.ZodDate;
    end: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
