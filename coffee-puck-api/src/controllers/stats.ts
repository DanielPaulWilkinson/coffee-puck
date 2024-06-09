import { NextFunction, Request, Response } from "express";
import { getBrewRowCountQuery } from "../data/brewQueries";
import { getCoffeeRowCountQuery } from "../data/coffeeQueries";
import { getVarietyRowCountQuery } from "../data/varietyQueries";
import { getRoasterRowCountQuery } from "../data/roasterQueries";

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coffeeCount = await getCoffeeRowCountQuery();
    const brewCount = await getBrewRowCountQuery();
    const varietyCount = await getVarietyRowCountQuery();
    const roasterCount = await getRoasterRowCountQuery();
    res.json({
      coffee: [
        { value: coffeeCount, name: "Total Coffees" },
        { value: 2, name: "Decaf"},
        { value: 20, name: "Not Decaf"},
        { value: 2.99, name: "Avg Cost"},
        { value: "Holiday Roast", name: "Fave Coffee"}
      ],
    });
  } catch (err) {
    next(err);
  }
};
