import { bean } from "../types/types";
import { pool } from "./database";

const getBeanSQL = "SELECT * FROM `beans` WHERE id = ?";
const getBeanPageSQL = "SELECT * FROM `beans` ORDER BY ? ? LIMIT ? OFFSET ?";
const createBeanSQL =
  "INSERT INTO `beans` (process,producers,altitude,roast,varietyId) values (?,?,?,?,?)";
const createCoffeeBeanSQL =
  "INSERT INTO `coffee_bean` (coffeeId,beanId) values (?,?)";
const getCoffeeBeanSQL = `select b.*, v.* from coffee_bean cb
INNER JOIN beans b on cb.beanId = b.id
INNER JOIN varieties v on b.varietyId = v.id
where coffeeId = ?`;
const beanLengthSQL = "select count(id) as total_records from `varieties`";

export const getBeanRowCountQuery = async () => {
  const [rows] = await pool.query(beanLengthSQL);
  return JSON.parse(JSON.stringify(rows))[0].total_records;
};

export const getBeanPageQuery = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string
) => {
  const [rows] = await pool.query(getBeanPageSQL, [
    sortBy,
    sortOrder,
    Number(limit),
    Number(offset),
  ]);
  return rows;
};

export const getBeanQuery = async (id: string) => {
  const [rows] = await pool.query(getBeanSQL, [Number(id)]);
  return rows;
};

export const createNewBeanQuery = async (brew: bean): Promise<number> => {
  const [rows] = await pool.query(createBeanSQL, [
    brew.process,
    brew.producers,
    brew.altitude,
    brew.roast,
    brew.varietyId,
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const createNewCoffeeBeanQuery = async (
  coffeeId: number,
  beanId: number
): Promise<number> => {
  const [rows] = await pool.query(createCoffeeBeanSQL, [coffeeId, beanId]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const getAllBeansForCoffeeQuery = async (id: number) => {
  const [rows] = await pool.query(getCoffeeBeanSQL, [id]);
  return rows;
};
