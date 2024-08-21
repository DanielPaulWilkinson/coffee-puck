import { z } from "zod";
import { bean } from "../types/types";
import { pool } from "./database";
import { createNewBeanVarietyQuery, getSingleVarietyQuery, getVarietyForBean } from "./varietyQueries";

const getBeanSQL = "SELECT * FROM `beans` WHERE id = ?";
const getBeanPageSQL = "SELECT * FROM `beans` ORDER BY ? ? LIMIT ? OFFSET ?";
const createBeanSQL =
  "INSERT INTO `beans` (process,producers,altitude,roast) values (?,?,?,?)";
const createCoffeeBeanSQL =
  "INSERT INTO `coffee_bean` (coffeeId,beanId) values (?,?)";
const getCoffeeBeanSQL = `select b.* from coffee_bean cb
INNER JOIN beans b on cb.beanId = b.id
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

export const createNewBeanQuery = async (bean: bean): Promise<number> => {
  console.log('reached');
  const [rows] = await pool.query(createBeanSQL, [
    bean.process,
    bean.producers,
    bean.altitude,
    bean.roast,
  ]);
  const beanId = JSON.parse(JSON.stringify(rows)).insertId;
  await createNewBeanVarietyQuery(beanId, Number(bean.variety?.id));
  return beanId;
};

export const createNewCoffeeBeanQuery = async (
  coffeeId: number,
  beanId: number
): Promise<number> => {
  console.log(coffeeId, beanId);
  const [rows] = await pool.query(createCoffeeBeanSQL, [coffeeId, beanId]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const getAllBeansForCoffeeQuery = async (id: number) => {
  const [rows] = await pool.query(getCoffeeBeanSQL, [id]);
  return z.array(bean).parse(rows);
};
