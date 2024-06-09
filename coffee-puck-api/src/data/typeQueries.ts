import { pool } from "./database";

const getTypeQuery = "select * from `coffee_types` where id = ?";
const getTypesQuery = "SELECT * FROM `coffee_types`"
const getTypesPageQuery = "SELECT * FROM `coffee_types` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?"
const typeLengthQuery = "select count(id) as total_records from `coffee_types`"



export const getTypeRowCount = async () => {
    const [rows] = await pool.query(typeLengthQuery)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getSingleType = async (id: string) => {
    const [rows] = await pool.query(getTypeQuery, [Number(id)]); 
    return JSON.parse(JSON.stringify(rows));
}

export const getTypes = async () => {
    const [rows] = await pool.query(getTypesQuery); 
    return rows;
}

export const getTypePage = async (offset: number, limit: number, sortBy: string, sortOrder: string, search: string) => {
    const [rows] = await pool.query(getTypesPageQuery, ['%' + search + '%', sortBy, sortOrder, Number(limit), Number(offset)]);
    return rows;
}