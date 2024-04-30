import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <h1 className="title">Bienvenido a Nuestra Aplicación</h1>
      <button className="button" onClick={() => handleNavigate('/signin')}>Iniciar Sesión</button>
      <button className="button" onClick={() => handleNavigate('/signup')}>Registrarse</button>
    </div>
  );
}

export default MainPage;
