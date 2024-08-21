import { z } from "zod";
import { variety } from "../types/types";
import { pool } from "./database";

const getVarietySQL = "SELECT * FROM `varieties` WHERE id = ?";
const getVarietyPageSearchSQL = "SELECT * FROM `varieties` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const getVarietyPageSQL = "SELECT * FROM `varieties` ORDER BY ? ? LIMIT ? OFFSET ?";
const varietiesLengthSQL = "select count(id) as total_records from `varieties`"
const createBeanVarietySQL = "INSERT INTO `bean_variety` (beanId,varietyId) values (?,?)"
const getVarietyForBeanSQL = "SELECT v.* from bean_variety bv INNER JOIN varieties v on v.id = bv.varietyId Where bv.beanId = ?"

export const getVarietyRowCountQuery = async () => {
    const [rows] = await pool.query(varietiesLengthSQL)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getSingleVarietyQuery = async (id: number) => {
    const [rows] = await pool.query(getVarietySQL, [id]); 
    return z.array(variety).parse(rows);
}

export const getVarietyPageQuery = async (
    offset: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search: string
  ) => {
    if (search) {
        const [rows] = await pool.query(getVarietyPageSearchSQL, [ "%" + search + "%", sortBy, sortOrder, Number(limit), Number(offset)]); 
        return z.array(variety).parse(rows);
    } else {
        const [rows] = await pool.query(getVarietyPageSQL, [sortBy, sortOrder, Number(limit), Number(offset)]); 
        return z.array(variety).parse(rows);
    }
  };
  

export const createNewBeanVarietyQuery = async (beanId: number, varietyId: number): Promise<number> => {
        const [rows] = await pool.query(createBeanVarietySQL, [beanId, varietyId]);
        return JSON.parse(JSON.stringify(rows)).insertId;
}

export const getVarietyForBean = async (beanId: number) => {
    const [rows] = await pool.query(getVarietyForBeanSQL, [beanId]); 
    return z.array(variety).parse(rows);
}