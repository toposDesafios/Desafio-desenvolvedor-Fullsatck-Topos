import React, { useState, useEffect } from 'react';
import FormEmployee from '../../components/FormEmployee';
import FormDependent from '../../components/FormDependent';
import ToggleRegister from '../../components/ToggleRegister';
import './index.css';

function Register() {
  const [formFade, setFormFade] = useState(true);
 
  // Função para inverter a variavel do Fade
  const handleFade = () => {
    setFormFade(!formFade);
  };

  return (
    <div className="register-content">
      <ToggleRegister formFade={formFade} handleToggleValue={handleFade}></ToggleRegister> 
      { formFade ? <FormEmployee></FormEmployee> : null }
      { !formFade ? <FormDependent></FormDependent> : null }
    </div>
  );
}

export default Register;