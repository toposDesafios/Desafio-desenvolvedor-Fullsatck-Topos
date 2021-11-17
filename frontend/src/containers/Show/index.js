import React, { useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Axios from 'axios';
import './index.css';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [dataEmployee, setDataEmployee] = React.useState([]);
  const [dataDependent, setDataDependent] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{employee.nome}</Typography>
            <Typography sx={{ width: '47%', color: 'text.secondary' }}>{employee.num_cpf}</Typography>
            <Typography sx={{ width: '10%', color: 'text.secondary' }}>
              <IconButton aria-label="delete" size="small"><EditIcon fontSize="small"/></IconButton>
            </Typography>
            <Typography sx={{ width: '10%', color: 'text.secondary' }}>
              <IconButton aria-label="delete" size="small"><DeleteIcon fontSize="small"/></IconButton>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {dataDependent.map((employee) => {
              return <Accordion expanded={expanded === employee.cod_funcionario} onChange={handleChange(employee.cod_funcionario)}>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>{employee.nome}</Typography>
                  <Typography sx={{ width: '47%', color: 'text.secondary' }}>{employee.num_cpf}</Typography>
                  <Typography sx={{ width: '10%', color: 'text.secondary' }}>
                    <IconButton aria-label="delete" size="small"><EditIcon fontSize="small"/></IconButton>
                  </Typography>
                  <Typography sx={{ width: '10%', color: 'text.secondary' }}>
                    <IconButton aria-label="delete" size="small"><DeleteIcon fontSize="small"/></IconButton>
                  </Typography>
                </AccordionSummary>
              </Accordion>

            })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      })}
      
    </div>
  );
}