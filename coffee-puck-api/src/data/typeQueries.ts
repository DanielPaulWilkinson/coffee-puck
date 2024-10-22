import { z } from "zod";
import { coffeeType } from "../types/types";
import { pool } from "./database";

const getTypeQuery = "select * from `coffee_types` where id = ?";
const getTypesQuery = "SELECT * FROM `coffee_types`"
const getTypesPageQuery = "SELECT * FROM `coffee_types` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?"

export const getSingleType = async (id: string) => {
    const [rows] = await pool.query(getTypeQuery, [Number(id)]); 
    return z.array(coffeeType).parse(rows);
}

export const getTypes = async () => {
    const [rows] = await pool.query(getTypesQuery); 
    return z.array(coffeeType).parse(rows);
}

export const getTypePage = async (offset: number, limit: number, sortBy: string, sortOrder: string, search: string) => {
    const [rows] = await pool.query(getTypesPageQuery, ['%' + search + '%', sortBy, sortOrder, Number(limit), Number(offset)]);
    return z.array(coffeeType).parse(rows);
}