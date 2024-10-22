import { z } from "zod";
import { brew } from "../types/types";
import { pool } from "./database";

const getBrewSQL = "select * from `brew` where id = ?";
const getBrewForCoffeeSQL = "select * from `brew` where coffeeId = ?";
const getBrewPageSQL = "SELECT * FROM `brew` ORDER BY ? ? LIMIT ? OFFSET ?";
const createBrewSQL = `insert into brew (preGrindAroma, postGrindAroma, acidity, sweetness, body, finish, flavour, coffeeId, coffeeTypeId, rating, createdOn, updatedOn) values (? , ? , ? , ? , ? , ? , ? , ? , ? , ?, ?, ?)`;
const updateBrewSQL =
  "UPDATE brew SET preGrindAroma = ?, postGrindAroma = ?, acidity = ?,sweetness = ?,body = ?,`finish` = ?,`flavour` = ? ,coffeeId = ?, coffeeTypeId = ?,rating = ?, updatedOn = ? WHERE id = ?";

export const getSingleBrewQuery = async (id: string) => {
  const [rows] = await pool.query(getBrewSQL, [Number(id)]);
  return rows;
};

export const getBrewPageQuery = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string
) => {
  const [rows] = await pool.query(getBrewPageSQL, [
    sortBy,
    sortOrder,
    Number(limit),
    Number(offset),
  ]);
  return rows;
};

export const createNewBrewQuery = async (brew: brew) => {
  const [rows] = await pool.query(createBrewSQL, [
    brew.preGrindAroma,
    brew.postGrindAroma,
    brew.acidity,
    brew.sweetness,
    brew.body,
    brew.finish,
    brew.flavour,
    brew.coffeeId,
    brew.coffeeTypeId,
    brew.rating,
    new Date(),
    new Date(),
  ]);
  return rows;
};

export const updateBrewQuery = async (coffee: brew, id: string) => {
  const [rows] = await pool.query(updateBrewSQL, [
    coffee.preGrindAroma,
    coffee.postGrindAroma,
    coffee.acidity,
    coffee.sweetness,
    coffee.body,
    coffee.finish,
    coffee.flavour,
    coffee.coffeeId,
    coffee.coffeeTypeId,
    coffee.rating,
    new Date(),
    id,
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const getBrewForCoffee = async (coffeeId: number) => {
  const [rows] = await pool.query(getBrewForCoffeeSQL, [Number(coffeeId)]);
  return z.array(brew).parse(rows);
}
