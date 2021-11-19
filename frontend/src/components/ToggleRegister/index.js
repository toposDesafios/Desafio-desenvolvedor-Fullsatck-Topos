import React, { useState, useEffect } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';

// Função para alterar vareaveis de tema MUI 
const theme = createTheme({
  palette: {
    primary: {
      main: "#e3f2fd",
    },
    secondary: {
      main: '#1565c0',
    },
  },
});
// Estilo de tema MUI 
const useStyles = makeStyles({
  root: {
    width: '400px',
    height: '50px',
    position: 'absolute', 
    margin: 'auto auto auto -350px',      
    transform: 'rotate(-90deg)',
  },
  button: {
    width: '200px',
    height: '50px',
  }
});

function ToggleRegister(props) {
  
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup variant="contained" className={classes.root}>
        <Button className={classes.button} onClick={props.handleToggleValue} color={!props.formFade ? "secondary" : "primary"}>Dependente</Button>
        <Button className={classes.button} onClick={props.handleToggleValue} color={props.formFade ? "secondary" : "primary"}>Funcionario</Button>
      </ButtonGroup>
    </ThemeProvider>
  );
}

export default ToggleRegister;