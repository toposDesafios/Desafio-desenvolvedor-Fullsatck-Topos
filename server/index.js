const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const sqlite3 = require("sqlite3").verbose();

const db_name = path.join(__dirname, "/database/", "database.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'database.db'");
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res) => {
  console.log(req);
  const sql_insert = `INSERT INTO Funcionario (data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
  (?, ?, ?, ?, ?);`;
  db.run(sql_insert, [req.body.data_nascimento, req.body.nome, req.body.nome_mae, req.body.num_cpf, req.body.num_rg] ,(err, result) => {
    console.log('sucess');
  })
 });

app.listen(3001, () => { 
  console.log("Server started (http://localhost:3001/) !");
});

// app.get("/", (req, res) => { 
//   // Database seeding
//   const sql_insert = `INSERT INTO Funcionario (data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
//   ('1994-12-07', 'Jonas', 'Helena', '05549951584', '1108169715');`;
//   db.run(sql_insert, (err, result) => {
//     res.send ("Hello world...");
//   })
// });