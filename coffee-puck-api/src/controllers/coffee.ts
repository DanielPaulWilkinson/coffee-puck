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
} from "../data/beanQueries";
import { bean, coffee, paginationRequest } from "../types/types";
import { getVarietyForBean } from "../data/varietyQueries";
import { getBrewForCoffee } from "../data/brewQueries";

export const getFullCoffees = async (): Promise<coffee[]> => {
  const coffee: coffee[] = await getAllCoffeeQuery();

  for (let i = 0; i < coffee.length; i++) {
    let beans = await getAllBeansForCoffeeQuery(coffee[i].id!);
    if (beans.length > 0) {
      for (let ii = 0; ii < beans.length; ii++) {
        let v = await getVarietyForBean(beans[ii].id ?? 0);

        if (v.length > 0) {
          beans[ii].variety = v[0];
        }
      }
    }
    coffee[i].brews = await getBrewForCoffee(coffee[i].id!);
    coffee[i].beans = beans;
  }
  return coffee;
};

export const getCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id) {
      const coffee: coffee[] = await getCoffeeQuery(req.params.id);

      for (let i = 0; i < coffee.length; i++) {
        let beans = await getAllBeansForCoffeeQuery(coffee[i].id!);
        if (beans.length > 0) {
          for (let ii = 0; ii < beans.length; ii++) {
            let v = await getVarietyForBean(beans[ii].id ?? 0);

            if (v.length > 0) {
              beans[ii].variety = v[0];
            }
          }
        }
        coffee[i].beans = beans;
      }
      return res.json(coffee[0]);
    }
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
    const maybeValid = await paginationRequest.safeParseAsync(req.query);
    if (maybeValid.success) {
      const data = maybeValid.data;
      const offset = data.page * data.limit - data.limit;
      const totalRecords = await getCoffeeRowCountQuery();
      const totalPages = totalRecords / data.limit;
      const coffee: coffee[] = await getCoffeePageQuery(
        offset,
        data.limit,
        data.sortBy,
        data.sortOrder,
        data.search ?? ""
      );

      for (let i = 0; i < coffee.length; i++) {
          let beans = await getAllBeansForCoffeeQuery(coffee[i].id!);
          if (beans) {
            for (let ii = 0; ii < beans.length; ii++) {
              if(beans[ii].id){
                let v = await getVarietyForBean(beans[ii].id ?? 0);
                beans[ii].variety = v[0];
              }
            }
          }
          coffee[i].beans = beans;
      }

      return res.json({
        data: coffee,
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

export const createCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await coffee.safeParseAsync(req.body);
    if (maybeValid.success) {
      const coffeeId = await createNewCoffeeQuery(maybeValid.data);
      maybeValid.data.beans?.forEach(async (bean: bean) => {
        console.log(bean);
        const beanId = await createNewBeanQuery(bean);
        console.log(beanId);
        await createNewCoffeeBeanQuery(coffeeId, beanId);
        console.log("reached");
      });
      return res.json({
        coffeeId: coffeeId,
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

export const updateCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id) {
      const maybeValid = await coffee.safeParseAsync(req.body);
      if (maybeValid.success) {
        const response = await updateCoffeeQuery(
          maybeValid.data,
          req.params.id
        );
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
