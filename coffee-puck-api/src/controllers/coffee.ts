import { NextFunction, Request, Response } from 'express';
import { getCoffeePageQuery, createNewCoffeeQuery, getCoffeeRowCountQuery, updateCoffeeQuery, getCoffeeQuery} from '../data/coffeeQueries';
import { createNewBeanQuery, createNewCoffeeBeanQuery, getAllBeansForCoffeeQuery } from '../data/beanQueries';
import { bean, coffee } from '../types/types';

export const getCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await getCoffeeQuery(req.params.coffee);
        console.log(result);
        res.json(result);
    } catch (err){
        next(err);
    }
};

export const getCoffeePage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder, search } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getCoffeeRowCountQuery();

        const totalPages = totalRecords / Number(limit);

        const coffee = await getCoffeePageQuery(
            offset,
            Number(limit),
            sortBy as string,
            sortOrder as string,
            search as string) as coffee[];

            coffee.forEach(async d => {
                d.beans = await getAllBeansForCoffeeQuery(d.id) as bean[];
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

export const createCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
            const coffeeId = await createNewCoffeeQuery(req.body as coffee);
            console.log(coffeeId);
            req.body.beans?.forEach(async (bean: bean) => {
               const beanId = await createNewBeanQuery(bean);
               console.log(beanId);
               await createNewCoffeeBeanQuery(coffeeId, beanId);
            });

            res.json({
                coffeeId: coffeeId,
            });
        }
     catch (err){
        next(err);
    }
};

export const updateCoffee = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.params.id){
            const response = await updateCoffeeQuery(req.body as coffee, req.params.id);
            res.json({
                sucess: response,
            });
        }
        }
     catch (err){
        next(err);
    }
};