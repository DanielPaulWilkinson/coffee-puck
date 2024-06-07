import { NextFunction, Request, Response } from 'express';
import { getSingleVarietyQuery, getVarietyRowCountQuery, getVarietyPageQuery } from '../data/varietyQueries'

//used for a single brew detail
export const GetVariety = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getSingleVarietyQuery(req.params.brew);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// used for pagination
export const GetVarietyPage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getVarietyRowCountQuery();

        const totalPages = totalRecords / Number(limit);

        const brews = await getVarietyPageQuery(
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
