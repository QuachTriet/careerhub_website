const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
})

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

db.connect((err) => {
    if(err){
        console.error("MySQL can't connecting!!!!!!", err.message || err);
    } else {
        console.log("MySQL connecting!")
    }
});

module.exports = db;