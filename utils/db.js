const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MyStrong#Pass123",
    database: "tasks"
});

db.connect((err) => {
    if (err) {
      console.log(err);
    } else console.log("Connected to database");
});
  
module.exports = db;