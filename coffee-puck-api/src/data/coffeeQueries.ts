import { z } from "zod";
import { coffee } from "../types/types";
import { pool } from "./database";
import { Table } from "./common";

const getCoffeeSQL = "SELECT * FROM `coffee` WHERE id = ?";
const getAllCoffee = "SELECT * FROM `coffee`"
const getCoffeePageSearchSQL =
  "SELECT * FROM `coffee` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const getCoffeePageSQL =
  "SELECT * FROM `coffee` ORDER BY ? ? LIMIT ? OFFSET ?";
const updateCoffeeSQL =
  "UPDATE coffee SET name = ?, isDecaf = ?, rating = ?,roasterId = ?,recipe = ?,`cost` = ?,`size` = ? ,image = ?,updatedOn = ? WHERE id = ?";
const createCoffeeSQL =
  "INSERT INTO `coffee` (name, isDecaf, rating, roasterId, recipe, cost, size, image, createdOn, updatedOn) values (?,?,?,?,?,?,?,?,?,?)";

export const getCoffeeQuery = async (id: string) => {
  const [rows] = await pool.query(getCoffeeSQL, [Number(id)]);
  return z.array(coffee).parse(rows);
};

export const getAllCoffeeQuery = async () => {
  const [rows] = await pool.query(getAllCoffee);
  return z.array(coffee).parse(rows);
};

export const getCoffeePageQuery = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  search: string
) => {
  if (search) {
    const [rows] = await pool.query(getCoffeePageSearchSQL, [
      "%" + search + "%",
      sortBy,
      sortOrder,
      Number(limit),
      Number(offset),
    ]);
    return z.array(coffee).parse(rows);
  } else {
    const [rows] = await pool.query(getCoffeePageSQL, [
      sortBy,
      sortOrder,
      Number(limit),
      Number(offset),
    ]);
    return z.array(coffee).parse(rows);
  }
};

export const createNewCoffeeQuery = async (brew: coffee): Promise<number> => {
  const [rows] = await pool.query(createCoffeeSQL, [
    brew.name,
    brew.isDecaf,
    brew.rating,
    brew.roasterId,
    brew.recipe,
    brew.cost,
    brew.size,
    brew.image,
    new Date(),
    new Date(),
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const updateCoffeeQuery = async (coffee: coffee, id: string) => {
  const [rows] = await pool.query(updateCoffeeSQL, [
    coffee.name,
    coffee.isDecaf,
    coffee.rating,
    coffee.roasterId,
    coffee.recipe,
    coffee.cost,
    coffee.size,
    coffee.image,
    new Date(),
    id,
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

export const getNotes = async () => {
  const [rows] = await pool.query(`select notes from ${Table.roasters_coffee_scrape_results} where notes != ''`);
  const notes = z.array(z.object({
    notes: z.string(),
  })).parse(rows);

  let uniqueNotes: string[] = []

  notes.forEach(note => {
    let notes = note.notes
      .replace(".","")
      .replace("&", ",")
      .split(",");
        
    notes.forEach(no => {
      uniqueNotes.push(no.trim().toLocaleLowerCase());
    })
  })

  return uniqueNotes.filter(onlyUnique);
}

function onlyUnique(value: any, index: any, array: string | any[]) {
  return array.indexOf(value) === index;
}
