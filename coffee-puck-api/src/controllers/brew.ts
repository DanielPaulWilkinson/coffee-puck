import { NextFunction, Request, Response } from 'express';
import { getBrewPage, getSingleBrew, createNewBrew, getBrewRowCount } from '../data/brewQueries';
import { Brew } from '../types/types';

//used for a single brew detail
export const GetBrew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getSingleBrew(req.params.brew);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// used for pagination
export const GetBrewPage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getBrewRowCount();

        const totalPages = totalRecords / Number(limit);

        const brews = await getBrewPage(
            offset,
            Number(limit),
            sortBy as string,
            sortOrder as string);

            res.json(
                {
                    data: brews,
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

export const CreateBrew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const result = await createNewBrew(req.body as Brew);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
