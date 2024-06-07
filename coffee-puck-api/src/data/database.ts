import mysql, { OkPacket } from 'mysql2'

export const pool = mysql.createPool({
    user: "root",
    password: "rootroot",
    database: "coffee"
}).promise();




