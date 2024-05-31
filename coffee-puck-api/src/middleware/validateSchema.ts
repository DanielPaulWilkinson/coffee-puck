import Joi, { ObjectSchema } from 'joi';
import Logging from '../logging/logging';
import { NextFunction, Request, Response } from 'express';
import { Bean, Brew, Coffee } from '../types/types';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    coffee: {
        getAll: Joi.object({}),
        get: Joi.object({}),
        post: Joi.object<Coffee>({  
            id: Joi.number(),
            name: Joi.string().required().max(200),
            createdOn: Joi.string().required(),
            updatedOn: Joi.string(),
            isDecaf: Joi.boolean(),
            rating: Joi.number().min(1).max(5),
            recipe: Joi.array().items(Joi.string()),
            roasterId: Joi.number().required(),
            cost: Joi.string(),
            size: Joi.string(),
            image: Joi.string(),
            beans: Joi.array()
            .items(
                Joi.object<Bean>({
                id: Joi.number(),
                varietyId: Joi.number(),
                process: Joi.string(),
                producers: Joi.string(),
                altitude: Joi.string(),
                roast: Joi.string(),
            }))
        }),
        getPage: Joi.object({}),
    },
    brew: {
        get: Joi.object({
            id: Joi.number(),
        }),
        getPage:Joi.object({}),
        post: Joi.object<Brew>({
            preGrindAroma: Joi.string().required(),
            postGrindAroma: Joi.string().required(),
            acidity: Joi.string().required(),
            sweetness: Joi.string().required(),
            body: Joi.string().required(),
            finish: Joi.string().required(),
            flavour: Joi.string().required(),
            coffeeId: Joi.number().required(),
            coffeeTypeId: Joi.number().required(),
            rating: Joi.number().required(),
        }).required()
    },
    types: {
        get: Joi.object({}),
    }
}