import React, { useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Axios from 'axios';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [dataEmployee, setDataEmployee] = React.useState([]);
  const [dataDependent, setDataDependent] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Coleta os dados de funcionarios para uso no SELECT
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getEmployee').then((response) => {
      setDataEmployee(response.data);
      console.log(response.data);
    });
  }, []) ;

  return (
    <div>
      {dataEmployee.map((employee) => {
        return <Accordion expanded={expanded === employee.cod_funcionario} onChange={handleChange(employee.cod_funcionario)}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {employee.nome}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{employee.num_cpf}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      })}
      
    </div>
  );
}