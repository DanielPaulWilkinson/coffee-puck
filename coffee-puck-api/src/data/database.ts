import mysql, { OkPacket } from 'mysql2'
import Logging from '../logging/logging';
import { Bean, Brew, Coffee } from '../types/types';

export const pool = mysql.createPool({
    user: "root",
    password: "rootroot",
    database: "coffee"
}).promise()

//brew





