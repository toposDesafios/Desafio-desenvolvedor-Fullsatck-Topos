const express = require("express");
const path = require("path");
const app = express();

const sqlite3 = require("sqlite3").verbose();

const db_name = path.join(__dirname, "/database/", "db.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'db.db'");
});



app.listen(3001, () => { 
  console.log("Server started (http://localhost:3001/) !");
});

app.get("/", (req, res) => { 
  // Database seeding
  const sql_insert = `INSERT INTO Funcionario (data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
  ('1994-12-07', 'Jonas', 'Helena', '05549951584', '1108169715');`;
  db.run(sql_insert, (err, result) => {
    res.send ("Hello world...");
  })
});