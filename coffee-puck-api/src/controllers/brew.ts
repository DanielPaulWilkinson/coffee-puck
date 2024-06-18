import { NextFunction, Request, Response } from 'express';
import { getBrewPageQuery, getSingleBrewQuery, createNewBrewQuery, getBrewRowCountQuery, updateBrewQuery } from '../data/brewQueries';
import { brew } from '../types/types';

//used for a single brew detail
export const GetBrew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getSingleBrewQuery(req.params.id);
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

        const totalRecords = await getBrewRowCountQuery();

        const totalPages = totalRecords / Number(limit);

        const brews = await getBrewPageQuery(
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
                    prev_page: Number(page) === 1 ? 1 : Number(page) - 1
                }
            })

    }
    catch (err) {
        next(err);
    }
};

export const CreateBrew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createNewBrewQuery(req.body as brew);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};

export const UpdateBrew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.id) {
            const response = await updateBrewQuery(req.body as brew, req.params.id);
            res.json({
                sucess: response,
            });
        }
    }
    catch (err) {
        next(err);
    }
};