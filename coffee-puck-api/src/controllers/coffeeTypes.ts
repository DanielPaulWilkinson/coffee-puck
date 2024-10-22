import { NextFunction, Request, Response } from 'express';
import { getSingleType, getTypePage, getTypes } from '../data/typeQueries';
import { paginationRequest } from '../types/types';
import { getTableRowCount, Table } from '../data/common';

export const GetType = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await getSingleType(req.params.id);
        res.json(result[0]);
    } catch (err){
        next(err);
    }
};

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
        const maybeValid = await paginationRequest.safeParseAsync(req.query);
        if (maybeValid.success) {
        const data = maybeValid.data;
        const offset = data.page * data.limit - data.limit;
        const totalRecords = await getTableRowCount(Table.coffee_types);
        const totalPages = totalRecords / data.limit;
        const coffee = await getTypePage(
            offset,
            data.limit,
            data.sortBy,
            data.sortOrder,
            data.search ?? "");
            return res.json(
                {
                    data: coffee,
                    pagination: {
                        total_records: totalRecords,
                        total_pages: Math.round(totalPages),
                        current_page: data.page,
                        offset: offset,
                        next_page: data.page + 1,
                        prev_page:  data.page === 1 ? 1 : data.page - 1
                    }
                });
            } else {
                return res.json(maybeValid.error);
            }
    }
    catch (err) {
        next(err);
    }
};
