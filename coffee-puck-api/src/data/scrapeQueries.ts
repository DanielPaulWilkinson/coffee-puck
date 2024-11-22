import { pool } from "./database";
import { Table } from "../data/common";

const getCoffeeResults = "SELECT * FROM roasters_coffee_scrape_results";
const getTargets = "SELECT * FROM roasters_coffee_scrape";
export const getAllRoasterTargetsQuery = async () => {
  const [rows] = await pool.query(getTargets);
  return rows;
};

export const getAllResultsQuery = async () => {
    const [rows] = await pool.query(getCoffeeResults);
    return rows;
  };

  export const getAllScrapeLogPaginationQuery = async (
    offset: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
  ) => {
    const getCoffeeResults = `SELECT * FROM ${ Table.roasters_coffee_scrape_log } ORDER BY ? ? LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(getCoffeeResults, [
      sortBy,
      sortOrder,
      limit,
      offset,
    ]);
    return rows;
  };

  export const getAllResultsPaginationQuery = async (
    offset: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    notes: string[],
    priceMax: string,
    priceMin: string,
    origin: string,
    roasters: string[],
  ) => {

    const baseSQL = 'SELECT * FROM roasters_coffee_scrape_results';
    let noteSQL: string[] = []
    let roasterSQL: string[] = []
    let priceBetween = ""
    let originSQL = ""

    if(notes){
      notes.forEach(note => {
        noteSQL.push(` notes like '%${note}%'`);
      });
    }

    
    if(roasters) {
      roasters.forEach(roaster => {
        roasterSQL.push(` roaster = ${roaster}`);
      })
    }

    if(priceMin && priceMax){
      priceBetween = "AND price >= ${priceMin} AND ${priceMax} <= price";
    }


    if(origin){
      originSQL = `AND origin = '${origin}'`;
    }
    const hasWhereClause = (origin?.length > 0 || roasters?.length > 0 || notes?.length > 0) ? ' WHERE' : '';
    const hasNotesAndRoaster = roasters?.length > 0 && notes?.length > 0

    const sql = baseSQL + hasWhereClause + noteSQL.join(" AND ") + (hasNotesAndRoaster ? ' AND ' : '') + roasterSQL.join(" AND ") + priceBetween + originSQL + " ORDER BY ? ? LIMIT ? OFFSET ?";
    console.log(sql)
    const [rows,other] = await pool.query(sql, [
      sortBy,
      sortOrder,
      limit,
      offset,
    ]);
    console.log(other)
    return rows;
  };
  