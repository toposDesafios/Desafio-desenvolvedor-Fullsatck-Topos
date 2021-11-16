import React, { useState, useEffect } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import './index.css';
import { red } from '@mui/material/colors';

const useStyles = makeStyles({
  root: {
    width: '400px',
    height: '50px',
    position: 'absolute', 
    margin: 'auto auto auto -350px',      
    transform: 'rotate(-90deg)',
    background: red,
  },
  button: {
    width: '200px',
    height: '50px',
  }
});

function ToggleRegister() {
  const classes = useStyles();
  return (
    <ButtonGroup variant="contained" className={classes.root}>
      <Button className={classes.button}>Funcionario</Button>
      <Button className={classes.button}>Dependente</Button>
    </ButtonGroup>
  );
}

export default ToggleRegister;