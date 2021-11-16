import React, { useState, useEffect } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import './index.css';
import { red } from '@mui/material/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: '#0d47a1',
    },
  },
});

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
    <ButtonGroup variant="contained" className={classes.root}>
      <Button className={classes.button} onClick={props.handleToggleValue} color={!props.formFade ? "secondary" : "primary"}>Dependente</Button>
      <Button className={classes.button} onClick={props.handleToggleValue} color={props.formFade ? "secondary" : "primary"}>Funcionario</Button>
    </ButtonGroup>
  );
}

export default ToggleRegister;