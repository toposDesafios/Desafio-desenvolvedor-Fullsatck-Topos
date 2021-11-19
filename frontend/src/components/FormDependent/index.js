import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import brLocale from 'date-fns/locale/pt-BR';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import './index.css';

function FormDependent(props) {

  // Variaveis
  const [stateSnackbar, setStateSnackbar] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    severity: "error"
  });
  const [dataEmployee, setDataEmployee] = useState([]);
  const [codEmployee, setCodEmployee] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date('2014-08-18'));
  const [numRg, setNumRg] = useState('');
  const [numCpf, setNumCpf] = useState('');
  const [nameMother, setNameMother] = useState('');

  const { vertical, horizontal, open, message, severity } = stateSnackbar;
  // Função para submeter o formulario de cadastro de funcionario
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
        setStateSnackbar({
          open: true,
          vertical: 'bottom',
          horizontal: 'right',
          message: 'Dependente cadastrado.',
          severity: "success"
        });
        setTimeout(
          function() {
            window.location.reload();
          }
          .bind(this),
          1000
        );
      });  
    } else {
      setStateSnackbar({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
        message: 'Selecione um funcionario!',
        severity: "warning"
      });
    }
  };

  // Coleta os dados de funcionarios para uso no SELECT
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getEmployee').then((response) => {
      setDataEmployee(response.data);
    });
  }, []) ;

  // Cria as opções de Autocomplete do Select de funcionarios
  let optionsSelect = [];
    dataEmployee.map((employee) => {
      optionsSelect.push({label: employee.nome, value: employee.cod_funcionario})
  });

  
  return (
    <form className="list-inputs" onSubmit={setSubmitDependent}>
      <Autocomplete
        name="cod_funcionario"
        options={optionsSelect}
        onChange={(event, newValeu) => {setCodEmployee(newValeu.value)}}
        renderInput={(params) => <TextField {...params} label="Funcionario" />}
      />
      <TextField name="nome" label="Nome" variant="outlined" required onChange={(e) => {setName(e.target.value)}}/>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <DatePicker
          label="Data de Nascimento"
          name="data_nascimento"
          value={birthDate}
          locale={brLocale}
          required
          onChange={(newDate) => {setBirthDate(newDate)}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField type="text" name="num_rg" label="Identidade" variant="outlined" required onChange={(e) => {setNumRg(e.target.value)}}/>
      <TextField type="text" name="num_cpf" label="CPF" variant="outlined" required onChange={(e) => {setNumCpf(e.target.value)}}/>
      <TextField type="text" name="nome_mae" label="Nome da Mãe" variant="outlined" required onChange={(e) => {setNameMother(e.target.value)}}/>
      <Button type="submit" variant="contained">Cadastrar</Button>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default FormDependent;
