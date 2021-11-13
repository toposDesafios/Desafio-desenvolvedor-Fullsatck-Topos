import React, { useState } from 'react';
import './App.css';

function App() {

  const [nameEmployee, setNameEmployee] = useState('');
  const [birthDateEmployee, setBirthDateEmployee] = useState('');

  return (
    <div className="App">
      <h1>Desafio</h1>
      <input type="text" onChange={(e) => {setNameEmployee(e.target.value)}}></input>
      <input type="date" onChange={(e) => {setBirthDateEmployee(e.target.value)}}></input>
      {nameEmployee}
      {birthDateEmployee}
    </div>
  );
}

export default App;
