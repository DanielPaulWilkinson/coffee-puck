import { pool } from "./database";
import { roaster, social } from "../types/types";

const getRoasterSQL = "SELECT * FROM `roasters` WHERE id = ?";
const getRoasterPageSearchSQL =
  "SELECT * FROM `roasters` WHERE name LIKE ? ORDER BY ? ? LIMIT ? OFFSET ?";
const getRoasterPageSQL =
  "SELECT * FROM `roasters` ORDER BY ? ? LIMIT ? OFFSET ?";
const getRoasterLengthSQL = "select count(id) as total_records from `roasters`";

export const getRoasterRowCountQuery = async () => {
  const [rows] = await pool.query(getRoasterLengthSQL);
  return JSON.parse(JSON.stringify(rows))[0].total_records;
};

export const getSingleRoasterQuery = async (id: string) => {
  const [rows] = await pool.query(getRoasterSQL, [Number(id)]);
  return rows;
};

export const getRoasterPageQuery = async (
  offset: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  search: string
) => {
  if (search) {
    const [rows] = await pool.query(getRoasterPageSearchSQL, [
      "%" + search + "%",
      sortBy,
      sortOrder,
      limit,
      offset,
    ]);
    return rows;
  } else {
    const [rows] = await pool.query(getRoasterPageSQL, [
      sortBy,
      sortOrder,
      limit,
      offset,
    ]);
    return rows;
  }
};

const createRoasterSQL =
  "INSERT INTO `roasters` (name, logo, url, blogURL, notes) values (?,?,?,?,?)";
export const createRoasterQuery = async (roaster: roaster): Promise<number> => {
  const [rows] = await pool.query(createRoasterSQL, [
    roaster.name,
    roaster.logo,
    roaster.url,
    roaster.blogURL,
    roaster.notes
  ]);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

const updateRoasterSQL =
  "UPDATE roasters SET name = ?, logo = ?, url = ?,blogURL = ?,notes = ? WHERE id = ?";
export const updateRoasterQuery = async (roaster: roaster, id: string) => {
  const [rows] = await pool.query(updateRoasterSQL, [
    roaster.name,
    roaster.logo,
    roaster.url,
    roaster.blogURL,
    roaster.notes,
    id,
  ]);
  console.log(rows);
  return JSON.parse(JSON.stringify(rows)).insertId;
};

const updateRoasterSocialSQL =
  "Insert into socials (url, name, icon, roasterId) values (?,?,?,?)";
export const createRoasterSocialsQuery = async (social: social, roasterId: number) => {
    const [rows] = await pool.query(updateRoasterSocialSQL, [
      social.url,
      social.name,
      social.icon,
      roasterId
    ]);
    return JSON.parse(JSON.stringify(rows)).insertId;
  };
  