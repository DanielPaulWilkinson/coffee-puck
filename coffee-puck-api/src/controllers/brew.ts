import { NextFunction, Request, Response } from "express";
import {
  getBrewPageQuery,
  getSingleBrewQuery,
  updateBrewQuery,
} from "../data/brewQueries";
import { brew, paginationRequest } from "../types/types";
import { getTableRowCount, Table } from "../data/common";

export const GetBrew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id) {
      const result = await getSingleBrewQuery(req.params.id);
      return res.json(result);
    } else {
      return res.json({
        error: "no param id",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const GetBrewPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await paginationRequest.safeParseAsync(req.query);
    if (maybeValid.success) {
      const data = maybeValid.data;
      const offset = data.page * data.limit - data.limit;
      const totalRecords = await getTableRowCount(Table.brew);
      const totalPages = totalRecords / data.limit;
      const brews = await getBrewPageQuery(
        offset,
        data.limit,
        data.sortBy,
        data.sortOrder
      );
      res.json({
        data: brews,
        pagination: {
          total_records: totalRecords,
          total_pages: Math.round(totalPages),
          current_page: data.page,
          offset: offset,
          next_page: data.page + 1,
          prev_page: data.page === 1 ? 1 : data.page - 1,
        },
      });
    } else {
      return res.json(maybeValid.error);
    }
  } catch (err) {
    next(err);
  }
};

export const CreateBrew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await brew.safeParseAsync(req.body);
    if (maybeValid.success) {
      res.status(200).json(maybeValid.data);
    } else {
      res.json({
        error: maybeValid.error,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const UpdateBrew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id) {
      const maybeValid = await brew.safeParseAsync(req.body);
      if (maybeValid.success) {
        const response = await updateBrewQuery(maybeValid.data, req.params.id);
        res.json({
          success: response,
        });
      } else {
        res.json({
          error: maybeValid.error,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
