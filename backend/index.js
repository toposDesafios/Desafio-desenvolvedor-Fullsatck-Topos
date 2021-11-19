const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Conecta ao bando de dados SQLite
const db_name = path.join(__dirname, "/database/", "database.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Success database.db");
});

// SELECT  Funcionario.nome as Funcionario, Dependente.nome as Dependente
// FROM Dependente
// JOIN Funcionario ON Funcionario.cod_funcionario = Dependente.cod_funcionario;

// Seleciona os funcionarios 
app.get("/api/getEmployee", (request, response) => {
  const sql = `SELECT * FROM Funcionario;`;
  db.all(sql, (err, result) => {
    if (err) {
      return response.status(500).json({ err });
    }
    return response.status(200).json( result );
  });
});

// Seleciona os dependentes 
app.get("/api/getDependent", (request, response) => {
  const sql = `SELECT * FROM Dependente;`;
  db.all(sql, (err, result) => {
    if (err) {
      return response.status(500).json({ err });
    }
    return response.status(200).json( result );
  });
});

// Seleciona os dependentes 
app.get("/api/get", (request, response) => {
  const sqlEmployee = `SELECT * FROM Funcionario WHERE cod_funcionario = ?;`;
  const sqlDependent = `SELECT * FROM Dependente WHERE cod_dependente = ?;`;
  // Verifica qual query usar
  if (request.query.table === 'Funcionario') {
    db.all(sqlEmployee, request.query.cod, (err, result) => {
      if (err) {
        return response.status(500).json({ err });
      }
      return response.status(200).json( result[0] );
    });
  } else {
    db.all(sqlDependent, request.query.cod, (err, result) => {
      if (err) {
        return response.status(500).json({ err });
      }
      return response.status(200).json( result[0] );
    });
  }

});

// REST para inserir funcionario 
app.post("/api/insertEmployee", (request, response) => {
  const query = `INSERT INTO Funcionario (data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
  (?, ?, ?, ?, ?);`;
  db.run(query, [request.body.data_nascimento, request.body.nome, request.body.nome_mae, request.body.num_cpf, request.body.num_rg] ,(err, result) => {
    if (err) {
      return console.error(err.message);
    }
    return response.status(200).json('Employee inserted');
  })
 });

// REST para inserir dependente 
app.post("/api/insertDependent", (request, response) => {
  const query = `INSERT INTO Dependente (cod_funcionario, data_nascimento, nome, nome_mae, num_cpf, num_rg) VALUES
  (?, ?, ?, ?, ?, ?);`;
  db.run(query, [request.body.cod_funcionario, request.body.data_nascimento, request.body.nome, request.body.nome_mae, request.body.num_cpf, request.body.num_rg] ,(err, result) => {
    if (err) {
      return console.error(err.message);
    }
    return response.status(200).json('Dependent inserted');
  })
 });

 
// REST para update funcionario 
app.post("/api/update", (request, response) => {
  const sqlEmployee = `UPDATE Funcionario SET nome = ?, data_nascimento = ?, num_rg = ?, num_cpf = ?, nome_mae = ? WHERE cod_funcionario = ?;`;
  const sqlDependent = `UPDATE Dependente SET nome = ?, data_nascimento = ?, num_rg = ?, num_cpf = ?, nome_mae = ? WHERE cod_dependente = ?;`;
  
  if (request.body.table == 'Funcionario') {
    console.log('aqui');
    db.all(sqlEmployee, [request.body.nome, request.body.data_nascimento, request.body.num_rg, request.body.num_cpf, request.body.nome_mae, request.body.cod ], (err, result) => {
      if (err) {
        return response.status(500).json({ err });
      }
      return response.status(200).json( result );
    });
  } else {
    console.log('aqui2');
    db.all(sqlDependent, [request.body.nome, request.body.data_nascimento, request.body.num_rg, request.body.num_cpf, request.body.nome_mae, request.body.cod ], (err, result) => {
      if (err) {
        return response.status(500).json({ err });
      }
      return response.status(200).json( result );
    });
  }
 });

// REST para remover funcionario e seus dependentes
app.post("/api/removeEmployee", (request, response) => {
  const queryEmployee = `DELETE FROM Funcionario WHERE cod_funcionario = ?`;
  const queryDependent = `DELETE FROM Dependente WHERE cod_funcionario = ?`;
  db.run(queryEmployee, request.body.cod_funcionario ,(err, result) => {
    if (err) {
      return console.error(err.message);
    }
    return response.status(200).json('Employee deleted');
  })

  db.run(queryDependent, request.body.cod_funcionario ,(err, result) => {
    if (err) {
      console.error(err.message);
    }
  })
 });

// REST para remover dependente
app.post("/api/removeDependent", (request, response) => {
  const query = `DELETE FROM Dependente WHERE cod_dependente = ?`;
  db.run(query, request.body.cod_dependente ,(err, result) => {
    if (err) {
      return console.error(err.message);
    }
    return response.status(200).json('Dependent deleted');
  })
 });

// Inicia o servidor node
app.listen(3001, () => { 
  console.log("Server started (http://localhost:3001/)!");
});

