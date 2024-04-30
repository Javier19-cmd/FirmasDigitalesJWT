import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css'; // Importa los estilos CSS
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Obtén la función navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token); // Guardando el token en localStorage
      console.log('Inicio de sesión exitoso: ', response.data);

      // Navegando a la página protegida
      navigate('/dashboard');

    } catch (error) {
      console.error('Error en el inicio de sesión: ', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Username:
          <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="form-button">Sign In</button>
      </form>
      <button className="return-button" onClick={() => navigate('/')}>Regresar a la Página Principal</button>
    </div>
  );
}

export default SignIn;
