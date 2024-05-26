import { Coffee } from "../types/types";
import { getAllBeansForCoffee } from "./beanQueries";
import { pool } from "./database";

//all coffee
const getCoffeeQuery = "SELECT * FROM `coffee` WHERE id = ?";
const getCoffeePageQuery = "SELECT * FROM `coffee` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?"
const createCoffeeQuery = "INSERT INTO `coffee` (name, isDecaf, rating, roasterId, recipe, cost, size, image, createdOn, updatedOn) values ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
const coffeeLengthQuery = "select count(id) as total_records from `coffee`"

export const getSingleCoffee = async (id: string) => {
    const [rows] = await pool.query(getCoffeeQuery, [Number(id)]);
    const beans = await getAllBeansForCoffee(id);
    return {
        coffee: {
            info: JSON.parse(JSON.stringify(rows))[0],
            beans: beans
        }
    };
}

export const getCoffeeRowCount = async () => {
    const [rows] = await pool.query(coffeeLengthQuery)
    return JSON.parse(JSON.stringify(rows))[0].total_records;
}

export const getCoffeePage = async (offset: number, limit: number, sortBy: string, sortOrder: string, search: string) => {
    console.log(search, sortBy, sortOrder, limit, offset)
    const [rows, fields] = await pool.query(getCoffeePageQuery, ['%' + search + '%', sortBy, sortOrder, Number(limit), Number(offset)]);
    console.log(rows, fields);
    return rows;
}

export const createNewCoffee = async (brew: Coffee): Promise<Number> => {
    const [rows] = await pool.query(createCoffeeQuery,
        [
            brew.name,
            brew.isDecaf,
            brew.rating,
            brew.roasterId,
            brew.recipe,
            brew.cost,
            brew.size,
            brew.image,
            brew.createdOn,
            brew.updatedOn,
        ])
    return JSON.parse(JSON.stringify(rows)).insertId;
}