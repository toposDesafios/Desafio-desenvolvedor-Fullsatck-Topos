import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataDependent, setDataDependent] = useState([]);
  const [codEmployee, setCodEmployee] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [numRg, setNumRg] = useState('');
  const [numCpf, setNumCpf] = useState('');
  const [nameMother, setNameMother] = useState('');

  const setSubmitEmployee = () => {
    Axios.post('http://localhost:3001/api/insertEmployee', {
      nome: name, 
      data_nascimento: birthDate, 
      num_rg: numRg, 
      num_cpf: numCpf, 
      nome_mae: nameMother, 
    }).then(() => {
      return alert('Success');
    });
  };

  const setSubmitDependent = (e) => {
    e.preventDefault();
    if (codEmployee !== '') {
      Axios.post('http://localhost:3001/api/insertDependent', {
        cod_funcionario: codEmployee, 
        nome: name, 
        data_nascimento: birthDate, 
        num_rg: numRg, 
        num_cpf: numCpf, 
        nome_mae: nameMother, 
      }).then(() => {
        return alert('Success');
      });  
    } else {
      return alert('selecione um funcionario');
    }
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getEmployee').then((response) => {
      setDataEmployee(response.data);
      console.log(response.data);
    });
  }, []) ;

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getDependent').then((response) => {
      setDataDependent(response.data);
      console.log(response.data);
    });
  }, []) ;

  const handleRemoveEmployee = (e) => {
    console.log(e.target.value);
    Axios.post('http://localhost:3001/api/removeEmployee', {
        cod_funcionario: e.target.value
      }).then(() => {
        return alert('Success');
      });  
  };

  const handleRemoveDependent = (e) => {
    console.log(e.target.value);
    Axios.post('http://localhost:3001/api/removeDependent', {
        cod_dependente: e.target.value
      }).then(() => {
        return alert('Success');
      });  
  };

  return (
    <div className="App">
      <h1>Desafio</h1>
      <h2>Funcionario</h2>
      <form className="list-inputs" onSubmit={setSubmitEmployee}>
        <input type="text" name="nome" placeholder="Nome" required onChange={(e) => {setName(e.target.value)}}></input>
        <input type="date" name="data_nascimento" placeholder="Data de Nascimento" required onChange={(e) => {setBirthDate(e.target.value)}}></input>
        <input type="text" name="num_rg" placeholder="Identidade" required onChange={(e) => {setNumRg(e.target.value)}}></input>
        <input type="text" name="num_cpf" placeholder="CPF" required onChange={(e) => {setNumCpf(e.target.value)}}></input>
        <input type="text" name="nome_mae" placeholder="Nome da Mãe" required onChange={(e) => {setNameMother(e.target.value)}}></input>
        <input type="submit" value="Cadastrar"></input>
      </form>

      <h2>Dependente</h2>
      <form className="list-inputs" onSubmit={setSubmitDependent}>
        <select name="cod_funcionario" required onChange={(e) => {setCodEmployee(e.target.value)}}>
          <option disabled={true} value={null} selected>Selecione</option>
          {
            dataEmployee.map((employee)=> {
              return <option value={employee.cod_funcionario}>{employee.nome}</option>
            })
          }
        </select>
        <input type="text" name="nome" placeholder="Nome" required onChange={(e) => {setName(e.target.value)}}></input>
        <input type="date" name="data_nascimento" required onChange={(e) => {setBirthDate(e.target.value); console.log(birthDate)}}></input>
        <input type="text" name="num_rg" placeholder="Identidade" required onChange={(e) => {setNumRg(e.target.value)}}></input>
        <input type="text" name="num_cpf" placeholder="CPF" required onChange={(e) => {setNumCpf(e.target.value)}}></input>
        <input type="text" name="nome_mae" placeholder="Nome da Mãe" required onChange={(e) => {setNameMother(e.target.value)}}></input>
        <input type="submit" value="Cadastrar"></input>
      </form>
      
      
      <h2>Lista</h2>
      <div className="list-inputs">
        {
          dataEmployee.map( employee => {
            return <li>
              Funcionario: {employee.nome}
              <button onClick={handleRemoveEmployee} value={employee.cod_funcionario}>x</button>
              {
                dataDependent.map( dependent => {
                  if (employee.cod_funcionario === dependent.cod_funcionario ) {
                    return <li>Dependente: {dependent.nome} <button onClick={handleRemoveDependent} value={dependent.cod_dependente}>x</button></li>
                  }
                })
              }
            </li>
          })
        }
      </div>
    </div>
  );
}

export default App;
