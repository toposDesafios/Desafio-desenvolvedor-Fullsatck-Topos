import React, { useState, useEffect } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import './index.css';

function ToggleRegister() {
  return (
    <ButtonGroup variant="contained" orientation="vertical">
      <Button>Funcionario</Button>
      <Button>Dependente</Button>
    </ButtonGroup>
  );
}

export default ToggleRegister;