import { z } from "zod";


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
    name: z.string(),
    logo: z.string(),
    url: z.string(),
    blogUrl: z.string(),
    notes: z.string(),
    socials: z.array(social)
});

export const variety = z.object({
    id: z.number(),
   name: z.string(),
   history: z.string(),
   parentId: z.number(),
   dwarf: z.coerce.boolean(),
   lineage: z.string(),
   genetic: z.string(),
});
export const bean = z.object({
    id: z.number(),
    process: z.string(),
    producers: z.string(),
    altitude: z.string(),
    roast: z.string(),
    variety: variety.nullable().optional(),
});

export const brew = z.object({
    id: z.number().optional().nullable(),
    preGrindAroma: z.string(),
    postGrindAroma: z.string(),
    acidity: z.string(),
    sweetness: z.string(),
    body: z.string(),
    finish: z.string(),
    flavour: z.string(),
    coffeeId: z.number(),
    coffeeTypeId: z.number(),
    rating: z.number(),
    createdOn: z.date().optional().nullable(),
    updatedOn: z.date().optional().nullable(),
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
    isDecaf: z.coerce.boolean(),
    rating: z.number(),  
    size: z.string(),
    image: z.string(),
    cost: z.string(),
    recipe: z.string(),
    roasterId: z.number(),
    beans: z.array(bean).optional().nullable(),
    brews: z.array(brew).optional().nullable(),
});

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

export const coffeePaginationResponse = z.object({
    pagination: pagination,
    coffee: z.array(coffee),
});