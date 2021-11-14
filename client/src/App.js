import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [dataDB, setDataDB] = useState([]);
  const [codFuncionario, setCodFuncionario] = useState('');
  const [nameEmployee, setNameEmployee] = useState('');
  const [birthDateEmployee, setBirthDateEmployee] = useState('');
  const [numRgEmployee, setNumRgEmployee] = useState('');
  const [numCpfEmployee, setNumCpfEmployee] = useState('');
  const [nameMotherEmployee, setNameMotherEmployee] = useState('');

  const setSubmitEmployee = () => {
    Axios.post('http://localhost:3001/api/insertEmployee', {
      nome: nameEmployee, 
      data_nascimento: birthDateEmployee, 
      num_rg: numRgEmployee, 
      num_cpf: numCpfEmployee, 
      nome_mae: nameMotherEmployee, 
    }).then(() => {
      alert('teste');
    });
  };

  const setSubmitDependent = () => {
    Axios.post('http://localhost:3001/api/insertDependent', {
      cod_funcionario: codFuncionario, 
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
      <h2>Funcionario</h2>
      <div className="list-inputs">
        <input type="text" name="nome" onChange={(e) => {setNameEmployee(e.target.value)}}></input>
        <input type="date" name="data_nascimento" onChange={(e) => {setBirthDateEmployee(e.target.value)}}></input>
        <input type="text" name="num_rg" onChange={(e) => {setNumRgEmployee(e.target.value)}}></input>
        <input type="text" name="num_cpf" onChange={(e) => {setNumCpfEmployee(e.target.value)}}></input>
        <input type="text" name="nome_mae" onChange={(e) => {setNameMotherEmployee(e.target.value)}}></input>
        <input type="submit" onClick={setSubmitEmployee}></input>
      </div>

      <h2>Dependente</h2>
      <div className="list-inputs">
        <select name="cod_funcionario" onChange={(e) => {setCodFuncionario(e.target.value)}}>
          {dataDB.map((val)=> {
            return <option value={val.cod_funcionario}>{val.nome}</option>
          })}
        </select>
        <input type="text" name="nome" onChange={(e) => {setNameEmployee(e.target.value)}}></input>
        <input type="date" name="data_nascimento" onChange={(e) => {setBirthDateEmployee(e.target.value)}}></input>
        <input type="text" name="num_rg" onChange={(e) => {setNumRgEmployee(e.target.value)}}></input>
        <input type="text" name="num_cpf" onChange={(e) => {setNumCpfEmployee(e.target.value)}}></input>
        <input type="text" name="nome_mae" onChange={(e) => {setNameMotherEmployee(e.target.value)}}></input>
        <input type="submit" onClick={setSubmitDependent}></input>
      </div>
      
      
      <h2>Lista</h2>
      <div className="list-inputs">
        {dataDB.map((val)=> {
          return <li>Nome: {val.nome}</li>
        })}
      </div>
    </div>
  );
}

export default App;
