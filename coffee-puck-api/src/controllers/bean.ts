import { NextFunction, Request, Response } from "express";
import {
  getBeanRowCountQuery,
  createNewCoffeeBeanQuery,
  getAllBeansForCoffeeQuery,
  getBeanQuery,
  getBeanPageQuery,
} from "../data/beanQueries";

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
    const { page, limit, sortBy, sortOrder } = req.query;

    const offset = Number(page) * Number(limit) - Number(limit);

    const totalRecords = await getBeanRowCountQuery();

    const totalPages = totalRecords / Number(limit);

    const brews = await getBeanPageQuery(
      offset,
      Number(limit),
      sortBy as string,
      sortOrder as string
    );

    res.json({
      data: brews,
      pagination: {
        total_records: totalRecords,
        total_pages: Math.round(totalPages),
        current_page: Number(page),
        offset: offset,
        next_page: Number(page) + 1,
        prev_page: Number(page) === 1 ? 1 : Number(page) - 1,
      },
    });
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
