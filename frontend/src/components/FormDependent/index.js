import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Axios from 'axios';
import './index.css';

function FormDependent() {
  
  const [dataEmployee, setDataEmployee] = useState([]);
  const [codEmployee, setCodEmployee] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date('2014-08-18'));
  const [numRg, setNumRg] = useState('');
  const [numCpf, setNumCpf] = useState('');
  const [nameMother, setNameMother] = useState('');

  const setSubmitDependent = (e) => {
    e.preventDefault();
    console.log(codEmployee);
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

  let optionsSelect = [];
    dataEmployee.map((employee) => {
      optionsSelect.push({label: employee.nome, value: employee.cod_funcionario})
  });

  console.log('optionsSelect');
  console.log(optionsSelect);
  
  return (
    <form className="list-inputs" onSubmit={setSubmitDependent}>
      <Autocomplete
        name="cod_funcionario"
        options={optionsSelect}
        onChange={(event, newValeu) => {setCodEmployee(newValeu.value)}}
        renderInput={(params) => <TextField {...params} label="Funcionario" />}

      />
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

export default FormDependent;
