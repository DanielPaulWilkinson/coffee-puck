import { Bean } from "../types/types";
import { pool } from "./database";

//all coffee
const getBeanQuery = "SELECT * FROM `beans` WHERE id = ?";
const getBeanPageQuery = "SELECT * FROM `beans` ORDER BY id LIMIT ? OFFSET ?";
const createBeanQuery = "INSERT INTO `beans` (process,producers,altitude,roast,varietyId) values (?,?,?,?,?)";


export const createNewBean = async(brew: Bean): Promise<Number> => {
    const [rows] = await pool.query(createBeanQuery, 
    [
        brew.process,
        brew.producers,
        brew.altitude,
        brew.roast,
        brew.varietyId,
    ])
    return JSON.parse(JSON.stringify(rows)).insertId;
}

const createCoffeeBeanQuery = "INSERT INTO `coffee_bean` (coffeeId,beanId) values (?,?)";
const getCoffeeBeanQuery = `select b.*, v.* from coffee_bean cb
INNER JOIN beans b on cb.beanId = b.id
INNER JOIN varieties v on b.varietyId = v.id
where coffeeId = ?`;

export const createNewCoffeeBean = async(brew: any): Promise<Number> => {
    const [rows] = await pool.query(createCoffeeBeanQuery, 
    [
        brew.coffeeId,
        brew.beanId,
    ])
    return JSON.parse(JSON.stringify(rows)).insertId;
}

export const getAllBeansForCoffee = async (id: string) => {
    const [rows] = await pool.query(getCoffeeBeanQuery, [Number(id)]); 
    return rows;
}