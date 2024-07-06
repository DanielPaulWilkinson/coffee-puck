import { NextFunction, Request, Response } from "express";
import {
  getRoasterRowCountQuery,
  getRoasterPageQuery,
  getSingleRoasterQuery,
  createRoasterQuery,
  updateRoasterQuery,
} from "../data/roasterQueries";
import { paginationRequest, roaster } from "../types/types";

export const GetRoaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const result = await getSingleRoasterQuery(req.params.id);
      res.json(result);
  } catch (err) {
    next(err);
  }
};

export const GetRoasterPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await paginationRequest.safeParseAsync(req.query);
    if (maybeValid.success) {
    const data = maybeValid.data;
    const offset = data.page * data.limit - data.limit;
    const totalRecords = await getRoasterRowCountQuery();
    const totalPages = totalRecords / data.limit;
    const roasters = await getRoasterPageQuery(
      offset,
      data.limit,
      data.sortBy,
      data.sortOrder,
      data.search ?? ""
    );

    return res.json({
      data: roasters,
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
    return res.json({
      error: maybeValid.error,
    });
  }
  } catch (err) {
    next(err);
  }
};

export const createRoaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await roaster.safeParseAsync(req.body);
    if (maybeValid.success) {
      const roasterId = await createRoasterQuery(req.body as roaster);
      return res.json({
        roasterId: roasterId,
      });
    } else {
      return res.json({
        error: maybeValid.error,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateRoaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await roaster.safeParseAsync(req.body);
    if (maybeValid.success) {
      const response = await updateRoasterQuery(
        req.body as roaster,
        req.params.id
      );
      res.json({
        roasterId: response,
      });
    } else {
      return res.json({
        error: maybeValid.error,
      });
    }
  } catch (err) {
    next(err);
  }
};
