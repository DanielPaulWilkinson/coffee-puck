import { NextFunction, Request, Response } from 'express';
import { getRoasterRowCountQuery, getRoasterPageQuery, getSingleRoasterQuery} from '../data/roasterQueries'

//used for a single brew detail
export const GetRoaster = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getSingleRoasterQuery(req.params.brew);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// used for pagination
export const GetRoasterPage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, limit, sortBy, sortOrder, search } = req.query;
    
        const offset = (Number(page) * Number(limit)) - Number(limit);

        const totalRecords = await getRoasterRowCountQuery();

        const totalPages = totalRecords / Number(limit);

        const brews = await getRoasterPageQuery(
            offset,
            Number(limit),
            sortBy as string,
            sortOrder as string,
            search as string);

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
