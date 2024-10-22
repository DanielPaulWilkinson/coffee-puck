import { NextFunction, Request, Response } from "express";
import {
  createNewCoffeeBeanQuery,
  getAllBeansForCoffeeQuery,
  getBeanQuery,
  getBeanPageQuery,
} from "../data/beanQueries";
import { paginationRequest } from "../types/types";
import { getTableRowCount, Table } from "../data/common";

export const getBean = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getBeanQuery(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getBeanPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await paginationRequest.safeParseAsync(req.query);
    if (maybeValid.success) {
      const data = maybeValid.data;
      const offset = data.page * data.limit - data.limit;
      const totalRecords = await getTableRowCount(Table.beans);
      const totalPages = totalRecords / data.limit;
      const brews = await getBeanPageQuery(
        offset,
        data.limit,
        data.sortBy,
        data.sortOrder
      );
      return res.json({
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

export const getBeanForCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllBeansForCoffeeQuery(Number(req.params.id));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const insertBeanForCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { coffee, bean } = req.body;

    const result = await createNewCoffeeBeanQuery(coffee, bean);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
