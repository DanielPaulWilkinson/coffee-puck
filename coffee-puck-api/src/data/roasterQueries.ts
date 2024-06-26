import { pool } from "./database";

const getVarietySQL = "SELECT * FROM `roasters` WHERE id = ?";
const getVarietyPageSQL = "SELECT * FROM `roasters` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const varietiesLengthSQL = "select count(id) as total_records from `roasters`"

export const getRoasterRowCountQuery = async () => {
    const [rows] = await pool.query(varietiesLengthSQL)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getSingleRoasterQuery = async (id: string) => {
    const [rows] = await pool.query(getVarietySQL, [Number(id)]); 
    return rows;
}

export const getRoasterPageQuery = async (offset: number, limit: number, sortBy: string, sortOrder: string, search: string) => {
    const [rows] = await pool.query(getVarietyPageSQL, [ "%" + search + "%", sortBy, sortOrder, Number(limit), Number(offset)]); 
    return rows;
}
