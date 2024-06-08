import { pool } from "./database";

const getVarietySQL = "SELECT * FROM `varieties` WHERE id = ?";
const getVarietyPageSQL = "SELECT * FROM `varieties` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const varietiesLengthSQL = "select count(id) as total_records from `varieties`"

export const getVarietyRowCountQuery = async () => {
    const [rows] = await pool.query(varietiesLengthSQL)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getSingleVarietyQuery = async (id: string) => {
    const [rows] = await pool.query(getVarietySQL, [Number(id)]); 
    return rows;
}

export const getVarietyPageQuery = async (offset: number, limit: number, sortBy: string, sortOrder: string, search: string) => {
    const [rows] = await pool.query(getVarietyPageSQL, [ "%" + search + "%", sortBy, sortOrder, Number(limit), Number(offset)]); 
    return rows;
}
