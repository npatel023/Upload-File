import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

connection.connect(error => {
    if (error) {
        console.log(error.message)
    }

    console.log('db connected')
})

export default connection