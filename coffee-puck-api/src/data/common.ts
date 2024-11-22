import { pool } from "./database";

export enum Table {
    beans = 'beans',
    socials = 'socials',
    varieties = 'varieties',
    roasters = 'roasters',
    brew = 'brew',
    coffee = 'coffee',
    coffee_bean = 'coffee_bean',
    coffee_types = 'coffee_types',
    roasters_coffee_scrape = 'roasters_coffee_scrape',
    roasters_coffee_scrape_results = 'roasters_coffee_scrape_results',
    roasters_coffee_scrape_log = 'roasters_coffee_scrape_log' 
}

export const getTableRowCount = async (table: Table) => {
    const [rows] = await pool.query(`select count(id) as total_records from ${table}`);
    return JSON.parse(JSON.stringify(rows))[0].total_records;
  };