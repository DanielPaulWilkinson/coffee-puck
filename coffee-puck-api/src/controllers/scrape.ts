import { NextFunction, Request, Response } from "express";
import { getAllRoasterTargetsQuery, getAllResultsQuery, getAllResultsPaginationQuery } from "../data/scrapeQueries";
import { paginationRequest } from "../types/types";
import { getTableRowCount, Table } from "../data/common";
import { getNotes } from "../data/coffeeQueries";

export const GetAllCoffeeTargets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const roasterTargets = await getAllRoasterTargetsQuery();
      return res.json(roasterTargets);
    } catch(e){
        console.log(e);
        next(e);
    }
  }

  export const GetAllCoffeeResults = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const roasterTargets = await getAllResultsQuery();
      return res.json(roasterTargets);
    } catch(e){
        console.log(e);
        next(e);
    }
  }

  export const GetAllResultsPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const maybeValid = await paginationRequest.safeParseAsync(req.query);
      if (maybeValid.success) {
        const data = maybeValid.data;
        const body = req.body;
        const offset = data.page * data.limit - data.limit;
        const totalRecords = await getTableRowCount(Table.roasters_coffee_scrape_results);
        const totalPages = totalRecords / data.limit;
        console.log(body);
        const results = await getAllResultsPaginationQuery(
          offset,
          data.limit,
          data.sortBy,
          data.sortOrder,
          body.notes,
          "",
          "",
          "",
          ""
        );
  
        const notes = await getNotes();

        return res.json({
          data: results,
          notes,
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