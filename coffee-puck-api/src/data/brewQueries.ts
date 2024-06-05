import { Brew } from "../types/types";
import { pool } from "./database";

const getBrewQuery = "select * from `brew` where id = ?";
const getBrewPageQuery = "SELECT * FROM `brew` ORDER BY ? ? LIMIT ? OFFSET ?";
const createBrewQuery = `insert into brew (preGrindAroma, postGrindAroma, acidity, sweetness, body, finish, flavour, coffeeId, coffeeTypeId, rating, createdOn, updatedOn) values (? , ? , ? , ? , ? , ? , ? , ? , ? , ?, ?, ?)`;
const brewLengthQuery = "select count(id) as total_records from `brew`";
const updateBrewQuery =
  "UPDATE brew SET preGrindAroma = ?, postGrindAroma = ?, acidity = ?,sweetness = ?,body = ?,`finish` = ?,`flavour` = ? ,coffeeId = ?, coffeeTypeId = ?,rating = ?, updatedOn = ? WHERE id = ?";
export const getBrewRowCount = async () => {
  const [rows] = await pool.query(brewLengthQuery);
  return JSON.parse(JSON.stringify(rows))[0].total_records;
};

export const getSingleBrew = async (id: string) => {
  const [rows] = await pool.query(getBrewQuery, [Number(id)]);
  return rows;
};

export const getBrewPage = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string
) => {
  const [rows] = await pool.query(getBrewPageQuery, [
    sortBy,
    sortOrder,
    Number(limit),
    Number(offset),
  ]);
  return rows;
};

export const createNewBrew = async (brew: Brew) => {
  const [rows] = await pool.query(createBrewQuery, [
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

export const updateBrew = async (coffee: Brew, id: string) => {
  const [rows] = await pool.query(updateBrewQuery, [
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
