import { z } from 'zod';
export declare const CreateRelationshipSchema: z.ZodObject<{
    sourceEntityId: z.ZodString;
    targetEntityId: z.ZodString;
    relationshipTypeId: z.ZodString;
}, z.core.$strip>;
