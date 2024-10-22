import { pool } from "./database";

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

  export const getAllResultsPaginationQuery = async (
    offset: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    notes: string[],
    roasterId: string,
    priceMax: string,
    priceMin: string,
    origin: string,
  ) => {

    const baseSQL = 'SELECT * FROM roasters_coffee_scrape_results';
    let noteSQL: string[] = []
    let roasterSQL = ""
    let priceBetween = ""
    let originSQL = ""

    if(notes){
      notes.forEach(note => {
        noteSQL.push(` notes like '%${note}%'`);
      });
    }

    if(roasterId){
      roasterSQL = `AND roaster = ${roasterId}`;
    }

    if(priceMin && priceMax){
      priceBetween = "AND price >= ${priceMin} AND ${priceMax} <= price";
    }

    if(origin){
      originSQL = `AND origin = '${origin}'`;
    }
    const hasWhereClause = (origin.length > 0 || roasterId.length > 0 || notes.length > 0) ? ' WHERE' : '';

    const sql = baseSQL + hasWhereClause + noteSQL.join(" OR ") + roasterSQL + priceBetween + originSQL + " ORDER BY ? ? LIMIT ? OFFSET ?";
    console.log(sql)
    const [rows] = await pool.query(sql, [
      sortBy,
      sortOrder,
      limit,
      offset,
    ]);
    return rows;
  };
  