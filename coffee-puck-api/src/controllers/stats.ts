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
      coffee: { total: { value: coffeeCount, name: "Total Coffees"}, decaf: 2, caffeinated: 20 },
      brew: {
        total: brewCount,
        highestRatedCommon: {
          acidity: "very acidic",
          sweetness: "subtle"
        },
      },
      variety: { total: varietyCount },
      roaster: { total: roasterCount },
    });
  } catch (err) {
    next(err);
  }
};
