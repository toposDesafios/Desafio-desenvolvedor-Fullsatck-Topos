import React, { useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';   
import Modal from '@mui/material/Modal'; 
import Stack from '@mui/material/Stack';            
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { format } from "date-fns";
import Axios from 'axios';
import FormUpdate from '../../components/FormUpdate';
import './index.css';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [dataEmployee, setDataEmployee] = React.useState([]);
  const [dataDependent, setDataDependent] = React.useState([]);
  const [stateSnackbar, setStateSnackbar] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    severity: "error"
  });
  const { vertical, horizontal, open, message, severity } = stateSnackbar;
  const [stateModal, setStateModal] = React.useState({
    openModal: false,
    table: 'employee',
    cod: ''
  });

  // Funcão para exibir e recolher o Accordion 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Funcão que abre a passar informações para o modal
  const handleOpenModalEmployee = (e) => {
    console.log(e.currentTarget.value);
    setStateModal({
      openModal: true,
      table: 'Funcionario',
      cod: e.currentTarget.value
    });
  };
// Funcão que abre a passar informações para o modal
  const handleOpenModalDependent = (e) => {
    console.log(e.currentTarget.value);
    setStateModal({
      openModal: true,
      table: 'Dependente',
      cod: e.currentTarget.value
    });
  };
  const handleCloseModal = () => setStateModal({ openModal: false });;

  // Chama a API para remover o funcionario e seus dependentes
  const handleRemoveEmployee = (e) => {
    console.log(e.currentTarget.value);
    Axios.post('http://localhost:3001/api/removeEmployee', {
        cod_funcionario: e.currentTarget.value
      }).then(() => {
        setStateSnackbar({
          open: true,
          vertical: 'bottom',
          horizontal: 'right',
          message: 'Funcionario removido!',
          severity: "info"
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

  // Chama a API para remover um unico dependente
  const handleRemoveDependent = (e) => {
    console.log(e.currentTarget.value);
    Axios.post('http://localhost:3001/api/removeDependent', {
        cod_dependente: e.currentTarget.value
      }).then(() => {
        setStateSnackbar({
          open: true,
          vertical: 'bottom',
          horizontal: 'right',
          message: 'Dependente removido!',
          severity: "info"
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

  // Coleta os dados de funcionarios para uso na pagina
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getEmployee').then((response) => {
      setDataEmployee(response.data);
      console.log('Emp');
      console.log(response.data);
    });
  }, []) ;

  // Coleta os dados de funcionarios para uso na pagina
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getDependent').then((response) => {
      setDataDependent(response.data);
      console.log('Dep');
      console.log(response.data);
    });
  }, []) ;

  return (
    <div className="list-employee">
      {dataEmployee.map((employee) => {
        return <Accordion expanded={expanded === employee.cod_funcionario} onChange={handleChange(employee.cod_funcionario)}>
          <AccordionSummary
            aria-controls={"panel"+ employee.cod_funcionario}
            id={"panel"+ employee.cod_funcionario}
          >
            <Typography sx={{ width: '40%', flexShrink: 0 }}>{employee.nome}</Typography>
            <Typography sx={{ width: '40%', color: 'text.secondary' }}>{employee.num_cpf}</Typography>
            <Typography sx={{ width: '10%', color: 'text.secondary' }}>
              <IconButton aria-label="edit" size="small" onClick={handleOpenModalEmployee}  value={employee.cod_funcionario}><EditIcon fontSize="small"/></IconButton>
            </Typography>
            <Typography sx={{ width: '10%', color: 'text.secondary' }}>
              <IconButton aria-label="delete" size="small" onClick={handleRemoveEmployee} value={employee.cod_funcionario}><DeleteIcon color="error" fontSize="small"/></IconButton>
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Typography sx={{ mt: -2}}>
              <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={1}>
                <span className>{format(new Date(employee.data_nascimento), "dd-MM-yyyy")}</span>
                <span className>{employee.num_rg}</span>
                <span className>{employee.nome_mae}</span>
              </Stack>
            </Typography> 

            {dataDependent.map((dependent) => {
              if (employee.cod_funcionario === dependent.cod_funcionario ) {
              return <List sx={{ width: '100%', maxWidth: 360}}>
              <Divider sx={{ mt: 1}}/>
              <Typography
                sx={{ mt: 0.5, ml: 0 }}
                color="text.secondary"
                display="flex"
                variant="caption"
              >
                Dependente
              </Typography>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={dependent.nome}
                      secondary={
                        <React.Fragment>
                          <Typography>
                            <Stack direction="row" justifyContent="space-evenly" spacing={3}>
                              <Stack justifyContent="space-evenly" alignItems="left" spacing={0}>
                                <span className>{format(new Date(dependent.data_nascimento), "dd-MM-yyyy")}</span>
                                <span className>{dependent.nome_mae}</span>
                              </Stack>
                              <Stack justifyContent="space-evenly" alignItems="left" spacing={0}>
                                <span className>{dependent.num_rg}</span>
                                <span className>{dependent.num_cpf}</span>
                              </Stack>
                              <Stack>
                                <Typography sx={{ width: '10%', color: 'text.secondary' }}>
                                  <IconButton aria-label="edit" size="small" onClick={handleOpenModalDependent} value={dependent.cod_dependente}><EditIcon fontSize="small"/></IconButton>
                                </Typography>
                                <Typography sx={{ width: '10%', color: 'text.secondary' }}>
                                  <IconButton aria-label="delete" size="small" onClick={handleRemoveDependent} value={dependent.cod_dependente}><DeleteIcon color="error" fontSize="small"/></IconButton>
                                </Typography>
                              </Stack>
                            </Stack>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              }
            })}
          </AccordionDetails>
        </Accordion>
      })}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Modal
        open={stateModal.openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormUpdate state={stateModal}></FormUpdate>
      </Modal>
    </div>
  );
}