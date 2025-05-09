import mysql from 'mysql2/promise'


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
        ca:  process.env.MYSQL_CA_PEM?.replace(/\\n/g, '\n'),
        rejectUnauthorized: false
    }
})

export {poolConfig}
