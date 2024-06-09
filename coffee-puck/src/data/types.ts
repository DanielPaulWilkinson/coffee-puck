import { z } from "zod";

export const bean = z.object({
    id: z.number(),
    varietyId: z.number(),
    process: z.string(),
    producers: z.string(),
    altitude: z.string(),
    roast: z.string(),
});

export const pagination = z.object({
    current_page: z.number(),
    next_page: z.number(),
    offset: z.number(),
    prev_page: z.number(),
    total_pages: z.number(),
    total_records: z.number(),
});

export const purchase = z.object({
    cost: z.string(),
    size: z.string(),
    image: z.string(),
});

export const social = z.object({
    url: z.string(),
    name: z.string(),
    icon: z.string(),
});

export const roaster = z.object({
    id: z.number().optional(),
    name: z.string(),
    logo: z.string(),
    url: z.string(),
    blogUrl: z.string(),
    notes: z.string(),
    socials: z.array(social),
});

export const variety = z.object({
    id: z.number(),
    varietyId: z.number(),
    name: z.string(),
    process: z.string(),
    producers: z.string(),
    altitude: z.string(),
    roast: z.string(),
});

export const brew = z.object({
    id: z.number().nullable().optional(),
    preGrindAroma: z.string(),
    postGrindAroma: z.string(),
    acidity: z.string(),
    sweetness: z.string(),
    body: z.string(),
    finish: z.string(),
    flavour: z.string(),
    coffeeId: z.number().nullable(),
    coffeeTypeId: z.number().nullable(),
    rating: z.number(),
});

export const coffeeType = z.object({
    id: z.number().optional(),
    name: z.string(),
    icon: z.string().nullable(),
    description: z.string().nullable(),
    ratio: z.string().nullable(),
});

export const content = z.object({
    varieties: z.array(variety),
    region: z.string(),
    country: z.string(),
    process: z.string(),
    producers: z.string(),
    altitude: z.string(),
    roastLevel: z.string(),
});

export const coffee = z.object({
    id: z.number(),
    name: z.string(),
    isDecaf: z.boolean(),
    rating: z.number(),
    size: z.string(),
    image: z.string(),
    cost: z.string(),
    recipe: z.string(),
    roasterId: z.number(),
    beans: z.array(bean),
});

export const statistic = z.object({ value: z.number(), name: z.string() });

export const statistics = z.object({
    coffee: z.array(statistic),
    brew: z.array(statistic),
    variety: z.array(statistic),
    roaster: z.array(statistic),
});

export type statistic = z.infer<typeof statistic>;
export type statistics = z.infer<typeof statistics>;
export type purchase = z.infer<typeof purchase>;
export type social = z.infer<typeof social>;
export type roaster = z.infer<typeof roaster>;
export type variety = z.infer<typeof variety>;
export type brew = z.infer<typeof brew>;
export type coffeeType = z.infer<typeof coffeeType>;
export type pagination = z.infer<typeof pagination>;
export type content = z.infer<typeof content>;
export type bean = z.infer<typeof bean>;
export type coffee = z.infer<typeof coffee>;
