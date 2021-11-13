const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const db_name = path.join(__dirname, "/database/", "database.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Success database.db");
});

app.post("/api/insert", (req, res) => {
  const sql_insert = `INSERT INTO Funcionario (data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
  (?, ?, ?, ?, ?);`;
  db.run(sql_insert, [req.body.data_nascimento, req.body.nome, req.body.nome_mae, req.body.num_cpf, req.body.num_rg] ,(err, result) => {
    
    console.log('sucess insert');
  })
 });

app.get("/api/getEmployee", (req, res) => {
  const sql_select = `SELECT * FROM Funcionario;`;
  db.all(sql_select, (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(result);
    //console.log(result);
  });
});

app.listen(3001, () => { 
  console.log("Server started (http://localhost:3001/)!");
});