import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import './index.css';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

function FormUpdate(props) {
  
  // Variaveis 
  const [dataCurrent, setDataCurrent] = useState({});
  const [name, setName] = useState(''); 
  const [birthDate, setBirthDate] = useState(new Date('2014-08-18'));
  const [numRg, setNumRg] = useState('');
  const [numCpf, setNumCpf] = useState('');
  const [nameMother, setNameMother] = useState('');  
  const [stateSnackbar, setStateSnackbar] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    severity: "error"
  });
  const { vertical, horizontal, open, message, severity } = stateSnackbar;
  
  
  // Coleta os dados de funcionarios para uso no SELECT
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get?table=' + props.state.table +'&cod=' + props.state.cod).then((response) => {
      console.log(response.data);
      setName(response.data.nome);
      setBirthDate(format(new Date(response.data.data_nascimento), "dd-MM-yyyy"));
      setNumRg(response.data.num_rg);
      setNumCpf(response.data.num_cpf);
      setNameMother(response.data.nome_mae);
      setDataCurrent(response.data);
    });
  }, []) ;

  // Função para submeter o formulario de cadastro de funcionario para api
  const setSubmitUpdate = (e) => {
    e.preventDefault(); 
    Axios.post('http://localhost:3001/api/update', {  // Chamada da API
      nome: name, 
      data_nascimento: birthDate, 
      num_rg: numRg, 
      num_cpf: numCpf, 
      nome_mae: nameMother,
      cod: props.state.cod,
      table: props.state.table
    }).then(() => {
      setStateSnackbar({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
        message: 'Cadastro atualizado!',
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
  };

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
  };

  console.log(props.state);

  return (
    
    <Typography sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {dataCurrent.nome}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <form className="list-inputs" onSubmit={setSubmitUpdate}>
      <TextField name="nome" label="Nome" variant="outlined" value={name} required onChange={(e) => {setName(e.target.value)}}/>
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
      <TextField type="text" name="num_rg" label="Identidade" variant="outlined" value={numRg} required onChange={(e) => {setNumRg(e.target.value)}}/>
      <TextField type="text" name="num_cpf" label="CPF" variant="outlined" value={numCpf} required onChange={(e) => {setNumCpf(e.target.value)}}/>
      <TextField type="text" name="nome_mae" label="Nome da Mãe" variant="outlined" value={nameMother} required onChange={(e) => {setNameMother(e.target.value)}}/>
      <Button type="submit" variant="contained">Atualizar</Button>
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
      </Typography>
    </Typography>
  );
}

export default FormUpdate;
