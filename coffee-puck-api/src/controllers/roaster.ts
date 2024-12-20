import { NextFunction, Request, Response } from "express";
import {
  getRoasterPageQuery,
  getSingleRoasterQuery,
  createRoasterQuery,
  updateRoasterQuery,
  createRoasterSocialsQuery,
} from "../data/roasterQueries";
import { paginationRequest, roaster } from "../types/types";
import { getTableRowCount, Table } from "../data/common";

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
      const totalRecords = await getTableRowCount(Table.roasters);
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
      const roasterId = await createRoasterQuery(maybeValid.data);

      if (maybeValid.data.socials) {
        maybeValid.data.socials.forEach(async social => {
          await createRoasterSocialsQuery(social, roasterId);
        });
      }

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
      const roasterId = await updateRoasterQuery(
        maybeValid.data,
        req.params.id
      );
      if (maybeValid.data.socials) {
        maybeValid.data.socials.forEach(async social => {
          await createRoasterSocialsQuery(social, Number(req.params.id));
        });
      }
      res.json({
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
