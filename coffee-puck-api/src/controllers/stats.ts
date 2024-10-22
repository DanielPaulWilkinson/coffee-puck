import { NextFunction, Request, Response } from "express";
import { getFullCoffees } from "./coffee";
import { coffee, coffeeType } from "../types/types";
import { GetTypes } from "./coffeeTypes";
import { getTypes } from "../data/typeQueries";
import { getTableRowCount, Table } from "../data/common";

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coffee = await getFullCoffees();
    const roasterCount = await getTableRowCount(Table.roasters);
    const beans = coffee.flatMap((x) => x.beans);
    const brews = coffee.flatMap((x) => x.brews);
    const types = await getTypes();
    heatMapForCoffee(coffee);
    res.json({
      statistics: [
        heatMapForCoffee(coffee),
        getVarietiesTried(coffee),
        getDecafVsCaffeinated(coffee),
        getTop5CoffeeTypes(coffee, types),
        getTop5Coffee(coffee),
        { value: coffee.length, title: "Total Coffees" },
        { value: beans.length, title: "Total Beans" },
        { value: brews.length, title: "Total Brews" },
        { value: roasterCount, title: "Total Roasters"},
        getFaveCoffee(coffee),
        getFaveCoffeeType(coffee, types),
      ],
    });
  } catch (err) {
    console.log('err', err);
    next(err);
  }
};

export type baseChart = {
  chartType: "heatmap" | "number" | "percentage" | "radial" | "none" | "pie";
  title: string;
  subtitle?: string;
  tooltip?: string;
  labels?: string[];
  colours?: string[];
  chartOptions?: string[];
};

export type baseStatistic = {
  value: string | number;
} & baseChart;

export type barChart = {
  dataGroups: number[] | string[];
} & baseChart;

export type heatMap = {
  days: { day: number; value: number }[];
} & baseChart;

export type pieChart = {
  data: number[];
} & baseChart;

export type chartError = {
  chartType: "heatmap" | "number" | "percentage" | "radial" | "none";
  title: string;
  error: string;
};

const getVarietiesTried = (coffee: coffee[]): pieChart | chartError => {
  let varieties: {
    id: number;
    count: number;
    name: string;
  }[] = [];

  coffee.forEach((coffee) => {
    coffee.beans?.forEach((beans) => {
      if (beans.variety) {
        const index = varieties.find((x) => x.id === beans.variety?.id);
        if (index) {
          index.count = index.count + 1;
        } else {
          console.log(beans.variety?.name ?? "");
          varieties.push({
            id: beans.variety?.id ?? 0,
            count: 1,
            name: beans.variety?.name ?? "",
          });
        }
      }
    });
  });

  varieties = varieties.sort((a, b) => b.count - a.count).slice(0, 5);

  return {
    data: varieties.flatMap((x) => x.count),
    labels: varieties.flatMap((x) => x.name),
    chartType: "pie",
    title: "Varieties drank",
    subtitle: "All varieties drank",
    tooltip: "Each slice represents a unique variety of coffee",
    colours: ["#c4a189", "#b48868", "#9e6f4e", "#6f373b", "#6f6a37", "#376f6a"],
  };
};

const heatMapForCoffee = (coffee: coffee[]): heatMap | chartError => {
  const days: { day: number; value: number }[] = [];

  coffee.forEach((coffee) => {
    coffee.brews?.forEach((brew) => {
      const index = days.find((x) => x.day === brew.createdOn?.getDate());
      if (index) {
        index.value = index.value + 1;
      } else {
        days.push({ day: brew.createdOn?.getDate() ?? 0, value: 1 });
      }
    });
  });
  return {
    title: "Coffee drank this month!",
    chartType: "heatmap",
    days,
  };
};

const getDecafVsCaffeinated = (coffee: coffee[]): barChart | chartError => {
  const decaf = coffee.filter((x) => x.isDecaf === true).length;
  const notDecaf = coffee.filter((x) => x.isDecaf === false).length;

  if (decaf < 5 && notDecaf < 5) {
    return {
      chartType: "number",
      title: "Decaf vs. Caffeinated",
      error: "Not enough data to compare",
    };
  }

  return {
    chartType: "number",
    chartOptions: [],
    title: "Decaf vs. Caffeinated",
    subtitle: "All coffees that are decaf vs caffeinated",
    tooltip: "",
    dataGroups: [decaf, notDecaf],
    colours: ["#765", "#876"],
    labels: ["Decaf", "Caffeinated"],
  };
};

const getTop5Coffee = (coffee: coffee[]): barChart | chartError => {
  let coffeeChartData: {
    id: number;
    ratings: number[];
    coffeeName: string;
    average: number;
    total: number,
  }[] = [];

  coffee.forEach((coffee) => {
    coffee.brews?.forEach((brew) => {
      const index = coffeeChartData.find((x) => x.id === brew.coffeeId);
      if (index) {
        index.ratings.push(brew.rating);
        index.total = index.total + brew.rating;
      } else {
        coffeeChartData.push({
          id: brew.coffeeId,
          ratings: [brew.rating],
          coffeeName: coffee.name,
          total: brew.rating,
          average: 0,
        });
      }
    });

    const currentRatings = coffeeChartData.find(
      (x) => x.id === coffee.id)?.ratings;

    if (currentRatings) {
      coffeeChartData.find((x) => x.id === coffee.id)!.average =
        currentRatings.reduce((part, a) => part + a, 0) / currentRatings.length;
    }
  });

  if (coffeeChartData[0].average < 1) {
    return {
      error: "not enough data to compare",
      title: "Top 5 coffees",
      chartType: "number",
    };
  }

  coffeeChartData = coffeeChartData.slice(0, 5).sort((a, b) => a.average - b.average);

  return {
    chartType: "number",
    chartOptions: [],
    title: "Top 5 coffee types",
    subtitle: "calculated by avg brew rating average",
    tooltip: "",
    dataGroups: coffeeChartData.flatMap((x) => x.average.toFixed(2)),
    colours: ["#ad6d2f", "#e4bc84", "#80411e", "#8f755f", "#d2c1b0"],
    labels: coffeeChartData.flatMap((x) => x.coffeeName),
  };
};

const getTop5CoffeeTypes = (
  coffee: coffee[],
  types: coffeeType[]
): barChart | chartError => {
  let coffeeTypeChartData: {
    coffeeTypeId: number;
    coffeeTypeQuantity: number;
    coffeeTypeName: string;
  }[] = [];

  coffee.forEach((coffee) => {
    coffee.brews?.forEach((brew) => {
      const index = coffeeTypeChartData.find(
        (x) => x.coffeeTypeId === brew.coffeeTypeId
      );
      if (index) {
        index.coffeeTypeQuantity = index.coffeeTypeQuantity + 1;
      } else {
        coffeeTypeChartData.push({
          coffeeTypeId: brew.coffeeTypeId,
          coffeeTypeQuantity: 1,
          coffeeTypeName:
            types.find((x) => x.id === brew.coffeeTypeId)?.name ?? "",
        });
      }
    });
  });

  coffeeTypeChartData = coffeeTypeChartData.sort((a, b) => a.coffeeTypeQuantity - b.coffeeTypeQuantity).slice(0, 5);

  return {
    chartType: "number",
    chartOptions: [],
    title: "Top 5 coffee types",
    subtitle: "Most drank coffee types",
    tooltip: "This chart shows the quantity of the top 5 coffee types",
    dataGroups: coffeeTypeChartData.flatMap((x) => x.coffeeTypeQuantity),
    colours: ["#ad6d2f", "#e4bc84", "#80411e", "#8f755f", "#d2c1b0"],
    labels: coffeeTypeChartData.flatMap((x) => x.coffeeTypeName),
  };
};

const getFaveCoffee = (coffees: coffee[]): baseStatistic => {
  const totals: { id: number; total: number, name: string }[] = [];

  coffees.forEach((coffee) => {
    coffee.brews?.forEach((brew) => {
      const index = totals.find((x) => x.id === coffee.id);
      if (index) {
        index.total = index.total + 1;
      } else {
        totals.push({ id: coffee.id!, total: 1, name: coffee.name });
      }
    });
  });

  const sorted = totals.sort((a,b) => b.total - a.total);

  return {
    title: "Top Coffee",
    chartType: "none",
    value: sorted[0].name,
  };
};

const getFaveCoffeeType = (
  coffees: coffee[],
  types: coffeeType[]
): baseStatistic => {
  const totals: { id: number; total: number }[] = [];

  coffees.forEach((coffee) => {
    coffee.brews?.forEach((brew) => {
      const index = totals.find((x) => x.id === brew.coffeeTypeId);
      if (index) {
        index.total = index.total + 1;
      } else {
        totals.push({ id: brew.coffeeTypeId, total: 1 });
      }
    });
  });

  const rse = totals.sort((a,b) => b.total - a.total);

  return {
    title: "Top Coffee Type",
    chartType: "none",
    value: types.find((x) => x.id === rse[0].id)?.name ?? "",
  };
};
