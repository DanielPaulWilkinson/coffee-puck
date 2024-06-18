import { NextFunction, Request, Response } from "express";
import {
  getCoffeePageQuery,
  createNewCoffeeQuery,
  getCoffeeRowCountQuery,
  updateCoffeeQuery,
  getCoffeeQuery,
  getAllCoffeeQuery,
} from "../data/coffeeQueries";
import {
  createNewBeanQuery,
  createNewCoffeeBeanQuery,
  getAllBeansForCoffeeQuery,
  getBeanQuery,
} from "../data/beanQueries";
import { bean, coffee, coffeePaginationResponse } from "../types/types";
import { GetVariety } from "./varieties";
import {
  getSingleVarietyQuery,
  getVarietyForBean,
} from "../data/varietyQueries";
import { getBrewForCoffee } from "../data/brewQueries";

export const getFullCoffees = async (): Promise<coffee[]> =>  {
  const coffee: coffee[] = await getAllCoffeeQuery();

    for (let i = 0; i < coffee.length; i++) {
      let beans = await getAllBeansForCoffeeQuery(coffee[i].id);
      if (beans.length > 0) {
        for (let ii = 0; ii < beans.length; ii++) {
          let v = await getVarietyForBean(beans[ii].id);

          if(v.length > 0){
            beans[ii].variety = v[0];
          }
        }
      }
      coffee[i].brews = await getBrewForCoffee(coffee[i].id);
      coffee[i].beans = beans;
    }
    return coffee;
}

export const getCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coffee: coffee[] = await getCoffeeQuery(req.params.id);

    for (let i = 0; i < coffee.length; i++) {
      let beans = await getAllBeansForCoffeeQuery(coffee[i].id);
      if (beans.length > 0) {
        for (let ii = 0; ii < beans.length; ii++) {
          let v = await getVarietyForBean(beans[ii].id);

          if(v.length > 0){
            beans[ii].variety = v[0];
          }
        }
      }
      coffee[i].beans = beans;
    }
    return res.json(coffee[0]);
  } catch (err) {
    next(err);
  }
};

export const getCoffeePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy, sortOrder, search } = req.query;
    const offset = Number(page) * Number(limit) - Number(limit);
    const totalRecords = await getCoffeeRowCountQuery();
    const totalPages = totalRecords / Number(limit);

    const coffee: coffee[] = await getCoffeePageQuery(
      offset,
      Number(limit),
      sortBy as string,
      sortOrder as string,
      search as string
    );

    for (let i = 0; i < coffee.length; i++) {
      let beans = await getAllBeansForCoffeeQuery(coffee[i].id);
      if (beans) {
        for (let ii = 0; ii < beans.length; ii++) {
          let v = await getVarietyForBean(beans[ii].id);
          beans[ii].variety = v[0];
        }
      }
      coffee[i].beans = beans;
    }

    res.json({
      data: coffee,
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

export const createCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coffeeId = await createNewCoffeeQuery(req.body as coffee);
    req.body.beans?.forEach(async (bean: bean) => {
      const beanId = await createNewBeanQuery(bean);
      await createNewCoffeeBeanQuery(coffeeId, beanId);
    });

    res.json({
      coffeeId: coffeeId,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id) {
      const response = await updateCoffeeQuery(
        req.body as coffee,
        req.params.id
      );
      res.json({
        sucess: response,
      });
    }
  } catch (err) {
    next(err);
  }
};
