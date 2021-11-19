import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import './index.css';

function Footer() {
  return (
    <footer>
      <Typography
        color="text.secondary"
        variant="caption"
      >
        Desenvolvido por <i>Jonas Teixeira</i> para o processo seletivo da <b>Topos</b>
      </Typography>
    </footer>
  );

  
}

export default Footer;
