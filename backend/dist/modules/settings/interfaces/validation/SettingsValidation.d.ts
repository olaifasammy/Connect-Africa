import { z } from 'zod';
export declare const ChangeThemeDtoSchema: z.ZodObject<{
    theme: z.ZodEnum<{
        light: "light";
        dark: "dark";
    }>;
}, z.core.$strip>;
export declare const UpdateSettingsDtoSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodEnum<{
        light: "light";
        dark: "dark";
    }>>;
    timezone: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
