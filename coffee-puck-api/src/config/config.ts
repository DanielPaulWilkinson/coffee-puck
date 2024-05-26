const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const TOKEN_KEY = process.env.TOKEN_KEY || '';
const DB_URL = process.env.DB_URL || '';

export const config = {
    server: {
        port: SERVER_PORT
    },
    auth: {
        token: TOKEN_KEY
    },
    dbUrl: DB_URL,
};