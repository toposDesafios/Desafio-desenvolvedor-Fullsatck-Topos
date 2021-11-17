import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Axios from 'axios';
import './index.css';

function FormEmployee() {
  
  // Variaveis 
  const [name, setName] = useState(''); 
  const [birthDate, setBirthDate] = useState(new Date('2014-08-18'));
  const [numRg, setNumRg] = useState('');
  const [numCpf, setNumCpf] = useState('');
  const [nameMother, setNameMother] = useState('');
  
  // Função para submeter o formulario de cadastro de funcionario para api
  const setSubmitEmployee = (e) => {
    e.preventDefault(); 
    Axios.post('http://localhost:3001/api/insertEmployee', {  // Chamada da API
      nome: name, 
      data_nascimento: birthDate, 
      num_rg: numRg, 
      num_cpf: numCpf, 
      nome_mae: nameMother, 
    }).then(() => {
      return alert('Success');
    });
  };

  return (
    <form className="list-inputs" onSubmit={setSubmitEmployee}>
      <TextField name="nome" label="Nome" variant="outlined" required onChange={(e) => {setName(e.target.value)}}/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Nascimento"
          name="data_nascimento"
          value={birthDate}
          required
          onChange={(newDate) => {setBirthDate(newDate)}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField type="text" name="num_rg" label="Identidade" variant="outlined" required onChange={(e) => {setNumRg(e.target.value)}}/>
      <TextField type="text" name="num_cpf" label="CPF" variant="outlined" required onChange={(e) => {setNumCpf(e.target.value)}}/>
      <TextField type="text" name="nome_mae" label="Nome da Mãe" variant="outlined" required onChange={(e) => {setNameMother(e.target.value)}}/>
      <Button type="submit" variant="contained">Cadastrar</Button>
    </form>
  );
}

export default FormEmployee;
