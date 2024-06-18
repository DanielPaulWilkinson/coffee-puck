import { z } from "zod";
import { coffee } from "../types/types";
import { pool } from "./database";

//all coffee
const getCoffeeSQL = "SELECT * FROM `coffee` WHERE id = ?";
const getAllCoffee = "SELECT * FROM `coffee`"
const getCoffeePageSearchSQL =
  "SELECT * FROM `coffee` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const getCoffeePageSQL =
  "SELECT * FROM `coffee` ORDER BY ? ? LIMIT ? OFFSET ?";
const updateCoffeeSQL =
  "UPDATE coffee SET name = ?, isDecaf = ?, rating = ?,roasterId = ?,recipe = ?,`cost` = ?,`size` = ? ,image = ?,updatedOn = ? WHERE id = ?";
const createCoffeeSQL =
  "INSERT INTO `coffee` (name, isDecaf, rating, roasterId, recipe, cost, size, image, createdOn, updatedOn) values (?,?,?,?,?,?,?,?,?,?)";
const coffeeLengthSQL = "select count(id) as total_records from `coffee`";

export const getCoffeeQuery = async (id: string) => {
  const [rows] = await pool.query(getCoffeeSQL, [Number(id)]);
  return z.array(coffee).parse(rows);
};

export const getAllCoffeeQuery = async () => {
  const [rows] = await pool.query(getAllCoffee);
  return z.array(coffee).parse(rows);
};

export const getCoffeeRowCountQuery = async () => {
  const [rows] = await pool.query(coffeeLengthSQL);
  return JSON.parse(JSON.stringify(rows))[0].total_records;
};

export const getCoffeePageQuery = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  search: string
) => {
  if (search) {
    const [rows, fields] = await pool.query(getCoffeePageSearchSQL, [
      "%" + search + "%",
      sortBy,
      sortOrder,
      Number(limit),
      Number(offset),
    ]);
    return z.array(coffee).parse(rows);
  } else {
    const [rows, fields] = await pool.query(getCoffeePageSQL, [
      sortBy,
      sortOrder,
      Number(limit),
      Number(offset),
    ]);
    return z.array(coffee).parse(rows);
  }
};

export const createNewCoffeeQuery = async (brew: coffee): Promise<number> => {
  const [rows] = await pool.query(createCoffeeSQL, [
    brew.name,
    brew.isDecaf,
    brew.rating,
    brew.roasterId,
    brew.recipe,
    brew.cost,
    brew.size,
    brew.image,
    new Date(),
    new Date(),
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const updateCoffeeQuery = async (coffee: coffee, id: string) => {
  const [rows] = await pool.query(updateCoffeeSQL, [
    coffee.name,
    coffee.isDecaf,
    coffee.rating,
    coffee.roasterId,
    coffee.recipe,
    coffee.cost,
    coffee.size,
    coffee.image,
    new Date(),
    id,
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};
