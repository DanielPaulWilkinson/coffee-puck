import { NextFunction, Request, Response } from 'express';
import { getCoffeePage, getSingleCoffee, createNewCoffee, getCoffeeRowCount, updateCoffee  } from '../data/coffeeQueries';
import { Bean, Coffee } from '../types/types';
import { createNewBean, createNewCoffeeBean, getAllBeansForCoffee } from '../data/beanQueries';

//used for a single brew detail
export const GetCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await getSingleCoffee(req.params.coffee);
        console.log(result);
        res.json(result);
    } catch (err){
        next(err);
    }
};

// used for pagination
export const GetCoffeePage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder, search } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getCoffeeRowCount();

        const totalPages = totalRecords / Number(limit);

        const coffee = await getCoffeePage(
            offset,
            Number(limit),
            sortBy as string,
            sortOrder as string,
            search as string) as Coffee[];

            coffee.forEach(async d => {
                d.beans = await getAllBeansForCoffee(d.id) as Bean[];
            });
            res.json(
                {
                    data: coffee,
                    pagination: {
                        total_records: totalRecords,
                        total_pages: Math.round(totalPages),
                        current_page: Number(page),
                        offset: offset,
                        next_page: Number(page) + 1,
                        prev_page:  Number(page) === 1 ? 1 : Number(page) - 1
                    }
                })

    }
    catch (err) {
        next(err);
    }
};

export const CreateCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
            const coffeeId = await createNewCoffee(req.body as Coffee);
            req.body.beans?.forEach(async (bean: Bean) => {
               const beanId = await createNewBean(bean);
               await createNewCoffeeBean({coffeeId, beanId});
            });

            res.json({
                coffeeId: coffeeId,

            });
        }
     catch (err){
        next(err);
    }
};

export const UpdateCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.params.id){
            const response = await updateCoffee(req.body as Coffee, req.params.id);
            res.json({
                sucess: response,
            });
        }
        }
     catch (err){
        next(err);
    }
};