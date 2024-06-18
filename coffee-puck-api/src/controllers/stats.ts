import { NextFunction, Request, Response } from "express";
import { getRoasterRowCountQuery } from "../data/roasterQueries";
import { getFullCoffees } from "./coffee";
import { coffee, coffeeType } from "../types/types";
import { GetTypes } from "./coffeeTypes";
import { getTypes } from "../data/typeQueries";

export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coffee = await getFullCoffees();
    const roasterCount = await getRoasterRowCountQuery();
    const beans = coffee.flatMap(x => x.beans);
    const brews = coffee.flatMap(x => x.brews);
    const types = await getTypes();
    heatMapForCoffee(coffee);
    res.json({
      coffee: [
        heatMapForCoffee(coffee),
        getDecafVsCaffeinated(coffee),
        getTop5CoffeeTypes(coffee, types),
        getTop5Coffee(coffee),
        { value: coffee.length, title: "Total Coffees"},
        { value: beans.length, title: "Total Beans"},
        { value: brews.length, title: "Total Brews" },
        { value: getFaveCoffee(coffee), title: "Fave Coffee" },
        { value: getFaveCoffeeType(coffee, types), title: "Fave Coffee Type" },
      ],
    });
  } catch (err) {
    next(err);
  }

};

export type chart = {
  chartStyle: string,
  chartOptions: string[],
  title: string,
  subtitle: string,
  tooltip: string,
  series: string[] | number[],
  colours: string[],
  label: string[] 
}

export type chartError = {
  chartStyle: string,
  title: string,
  error: string,
}

export type heatmap = {
  title: string,
  chartStyle: string,
  days: {day: number, value: number}[]
}
export type heatmapError = {
  title: string,
  error: string,
}
const heatMapForCoffee = (coffee: coffee[]): heatmap | heatmapError => {
  const days: {day: number, value: number}[] = [];

  coffee.forEach(coffee => {
    coffee.brews?.forEach(brew => {
          const index = days.find(x => x.day === brew.createdOn?.getDate());
          if(index){
             index.value = index.value + 1;
          }   
          else {
            days.push({ day: brew.createdOn?.getDate() ?? 0, value: 1})
          }
    });
  });
  return {
    title: "Coffee drank this month!",
    chartStyle: "heatmap",
    days,
  }
}

const getDecafVsCaffeinated = (coffee: coffee[]): chart | chartError => {
  const decaf = coffee.filter((x) => x.isDecaf === true).length;
  const notDecaf = coffee.filter((x) => x.isDecaf === false).length;

  if(decaf < 5 && notDecaf < 5){
    return { 
      chartStyle: "number",
      title: "Decaf vs. Caffeinated",
      error: "Not enough data to compare" 
    };
  }

  return {
    chartStyle: "number",
    chartOptions: [],
    title: "Decaf vs. Caffeinated",
    subtitle: "All coffees that are decaf vs caffeinated",
    tooltip: "",
    series: [decaf, notDecaf],
    colours: ["#765", "#876"],
    label:  ["Decaf", "Caffeinated"],
  };
}
const getTop5Coffee = (coffee: coffee[]): chart | chartError => {
  const coffeeChartData: {id: number, ratings: number[], coffeeName: string, average: number}[] = [];
  const avg = [];

  coffee.forEach(coffee => {
    coffee.brews?.forEach(brew => {
        const index = coffeeChartData.find(x => x.id === brew.coffeeId);
        if(index){
          index.ratings.push(brew.rating);
        }   
        else {
          coffeeChartData.push(
            {
              id: brew.coffeeId,
              ratings: [brew.rating],
              coffeeName: coffee.name,
              average: 0,
            })
        }
      });

      const currentRatings = coffeeChartData.find(x => x.id === coffee.id)?.ratings;
      if(currentRatings)
        {
          coffeeChartData.find(x => x.id === coffee.id)!.average = currentRatings.reduce((part, a) => part + a, 0) / currentRatings.length
        }
    });

    coffeeChartData.sort(x => x.average).slice(0, 4);

    if(coffeeChartData[0].average < 1){
      return { error: "not enough data to compare", title: "Top 5 coffees", chartStyle: "number"}
    }

    return {
      chartStyle: "number",
      chartOptions: [],
      title: "Top 5 coffee types",
      subtitle: "calculated by avg brew rating average",
      tooltip: "",
      series: coffeeChartData.flatMap(x => x.average.toFixed(2)),
      colours: ["#765", "#876"],
      label:  coffeeChartData.flatMap(x => x.coffeeName),
    }
}
const getTop5CoffeeTypes = (coffee: coffee[], types: coffeeType[]): chart | chartError => {
  const coffeeTypeChartData: {coffeeTypeId: number, coffeeTypeQuantity: number, coffeeTypeName: string}[] = [];

  coffee.forEach(coffee => {
    coffee.brews?.forEach(brew => {
        const index = coffeeTypeChartData.find(x => x.coffeeTypeId === brew.coffeeTypeId);
        if(index){
          index.coffeeTypeQuantity = index.coffeeTypeQuantity + 1;
        }   
        else {
          coffeeTypeChartData.push({coffeeTypeId: brew.coffeeTypeId, coffeeTypeQuantity: 1, coffeeTypeName: types.find(x => x.id === brew.coffeeTypeId)?.name ?? ''})
        }
      });
    });

    coffeeTypeChartData.sort(x => x.coffeeTypeQuantity).slice(0, 4);
  


    console.log(coffeeTypeChartData);
    return {
      chartStyle: "number",
      chartOptions: [],
      title: "Top 5 coffee types",
      subtitle: "Most drank coffee types",
      tooltip: "This chart shows the quantity of the top 5 coffee types",
      series: coffeeTypeChartData.flatMap(x => x.coffeeTypeQuantity),
      colours: [],
      label:  coffeeTypeChartData.flatMap(x => x.coffeeTypeName),
    };
  

}
const getFaveCoffee = (coffees: coffee[]) => {
  const totals: {id: number, total: number}[] = [];

  coffees.forEach(coffee => {
  coffee.brews?.forEach(brew => {
      const index = totals.find(x => x.id === coffee.id);
      if(index){
        index.total + 1;
      }   
      else {
        totals.push({id: coffee.id, total: 1})
      }
    });
  });

  const sorted = totals.sort(x => x.total);
  return coffees.find(x => x.id === sorted[0].id)?.name;
}
const getFaveCoffeeType = (coffees: coffee[], types: coffeeType[]) => {
  const totals: {id: number, total: number}[] = [];

  coffees.forEach(coffee => {
  coffee.brews?.forEach(brew => {
      const index = totals.find(x => x.id === brew.coffeeTypeId);
      if(index){
        index.total + 1;
      }   
      else {
        totals.push({id: brew.coffeeTypeId, total: 1})
      }
    });
  });

  const rse = totals.sort(x => x.total);
  return types.find(x => x.id === rse[0].id)?.name
  
}

