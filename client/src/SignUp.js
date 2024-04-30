import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Importa los estilos CSS
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Obtén la función navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log('Usuario registrado: ' + response.data);
      navigate('/'); // Regresando a la MainPage
    } catch (error) {
      console.log('Error en el registro: ' + error.response.data);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Username:
          <input type="text" value={username} className="form-input" onChange={e => setUsername(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input type="password" value={password} className="form-input" onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="form-button">Register</button>
      </form>
      <button className="return-button" onClick={() => navigate('/')}>Regresar a la Página Principal</button>
    </div>
  );
}

export default SignUp;
