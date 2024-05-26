import { get } from "mongoose";
import { Bean } from "../types/types";
import { pool } from "./database";

//all coffee
const getVarietyQuery = "SELECT * FROM `varieties` WHERE id = ?";
const getVarietyPageQuery = "SELECT * FROM `varieties` ORDER BY id LIMIT ? OFFSET ?";
const varietiesLengthQuery = "select count(id) as total_records from `varieties`"

export const getVarietyRowCount = async () => {
    const [rows] = await pool.query(varietiesLengthQuery)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getSingleVariety = async (id: string) => {
    const [rows] = await pool.query(getVarietyQuery, [Number(id)]); 
    return rows;
}

export const getVarietyPage = async (offset: number, limit: number, sortBy: string, sortOrder: string) => {
    const [rows] = await pool.query(getVarietyPageQuery, [sortBy, sortOrder, Number(limit), Number(offset)]); 
    return rows;
}
