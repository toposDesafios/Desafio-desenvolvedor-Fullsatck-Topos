import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [dataDB, setDataDB] = useState([]);
  const [nameEmployee, setNameEmployee] = useState('');
  const [birthDateEmployee, setBirthDateEmployee] = useState('');
  const [numRgEmployee, setNumRgEmployee] = useState('');
  const [numCpfEmployee, setNumCpfEmployee] = useState('');
  const [nameMotherEmployee, setNameMotherEmployee] = useState('');

  const setSubmit = () => {
    Axios.post('http://localhost:3001/api/insert', {
      nome: nameEmployee, 
      data_nascimento: birthDateEmployee, 
      num_rg: numRgEmployee, 
      num_cpf: numCpfEmployee, 
      nome_mae: nameMotherEmployee, 
    }).then(() => {
      alert('teste');
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getEmployee').then((response) => {
      setDataDB(response.data);
      console.log(response.data);
    });
  }, []) ;

  return (
    <div className="App">
      <h1>Desafio</h1>
      <div className="list-inputs">
        <input type="text" name="nome" onChange={(e) => {setNameEmployee(e.target.value)}}></input>
        <input type="date" name="data_nascimento" onChange={(e) => {setBirthDateEmployee(e.target.value)}}></input>
        <input type="text" name="num_rg" onChange={(e) => {setNumRgEmployee(e.target.value)}}></input>
        <input type="text" name="num_cpf" onChange={(e) => {setNumCpfEmployee(e.target.value)}}></input>
        <input type="text" name="nome_mae" onChange={(e) => {setNameMotherEmployee(e.target.value)}}></input>
        <input type="submit" onClick={setSubmit}></input>
      </div>
      
      <div className="list-inputs">
        {dataDB.map((val)=> {
          return <li>Nome: {val.nome}</li>
        })}
      </div>
    </div>
  );
}

export default App;
