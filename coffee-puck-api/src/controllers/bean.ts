import { NextFunction, Request, Response } from 'express';
import { createNewBean } from "../data/beanQueries";
import { Bean } from "../types/types";

export const CreateBrew = async (req: Request, res: Response, next: NextFunction) => {
    try{
            const result = await createNewBean(req.body as Bean);
            res.json(result);
        }
     catch (err){
        next(err);
    }
};