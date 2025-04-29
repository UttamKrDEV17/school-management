import mysql from 'mysql2/promise'
import fs from 'fs/promises'


const ca = await fs.readFile('ca.pem');

// const dbConfig = {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DBPORT,
//     ssl: {
//         ca
//     }
// }

// const DBConnection = async (req,res) => {
//     let connection
//     try {
//         connection = await mysql.createConnection(dbConfig)
//         const [rows] = await connection.execute('SELECT NOW() AS TIME')
//         console.log(`Database connected successfully`, rows[0].TIME)
//     } catch (error) {
//         console.error(error)
//     } finally {
//         if(connection) {
//             await connection.end()
//             console.log('Connection closed')
//         }
//     }
// }

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
// const DBConnection = async (SQL) => {
//     try {
//         const rows = await poolConfig.execute(`SELECT NOW() AS TIME`)
//         console.log(rows[0])
//         console.log(`Database connected successfully`)
//     } catch(error) {
//         console.error("database not connected",error)
//     }
// }


//export default DBConnection