import { NextFunction, Request, Response } from "express";
import { getAllRoasterTargetsQuery, getAllResultsQuery, getAllResultsPaginationQuery, getAllScrapeLogPaginationQuery } from "../data/scrapeQueries";
import { coffee, paginationRequest } from "../types/types";
import { getTableRowCount, Table } from "../data/common";
import { getNotes, getRoasters } from "../data/coffeeQueries";

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

export const GetAllScrapeLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maybeValid = await paginationRequest.safeParseAsync(req.query);
    if (maybeValid.success) {
      const data = maybeValid.data;
      const offset = data.page * data.limit - data.limit;
      const totalRecords = await getTableRowCount(Table.roasters_coffee_scrape_log);
      const totalPages = totalRecords / data.limit;
      const results = await getAllScrapeLogPaginationQuery(
        offset,
        data.limit,
        data.sortBy,
        data.sortOrder,
      );

      return res.json({
        data: results,
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
        const results = await getAllResultsPaginationQuery(
          offset,
          data.limit,
          data.sortBy,
          data.sortOrder,
          body.notes,
          "",
          "",
          "",
          body.roasters
        );
  
        const notes = await getNotes(body.notes, body.roasters);
        const roasters = await getRoasters(body.roasters, body.notes);

        return res.json({
          data: results,
          notes,
          roasters,
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

export const runCoffeeScrape = async () => {
  const { spawn } = require('child_process');
  const pyprog = spawn('python', ['../../../schedule-tasks/scrape_coffee.py']);
  pyprog.run
}
