import { NextFunction, Request, Response } from 'express';
import { getSingleType, getTypePage, getTypeRowCount, getTypes } from '../data/typeQueries';

//used for a single brew detail
export const GetType = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await getSingleType(req.params.type);
        res.json(result);
    } catch (err){
        next(err);
    }
};

//used for a single brew detail
export const GetTypes = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await getTypes();
        res.json(result);
    } catch (err){
        next(err);
    }
};

export const GetTypePage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder, search } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getTypeRowCount();

        const totalPages = totalRecords / Number(limit);

        const coffee = await getTypePage(
            offset,
            Number(limit),
            sortBy as string,
            sortOrder as string,
            search as string);

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
