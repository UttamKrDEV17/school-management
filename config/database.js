import mysql from 'mysql2/promise'
import fs from 'fs/promises'


const ca = await fs.readFile('./certs/ca.pem');

const poolConfig = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    waitForConnections: true,
    connectionLimit: 10,       
    queueLimit: 0, 
    ssl: {
        ca
    }
})

export {poolConfig}