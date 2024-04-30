import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const accessProtectedResource = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado');
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // "Acceso concedido"
      navigate('/protected');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Token inválido o expirado');
        navigate('/signin');
      } else {
        console.error('Error al acceder al recurso:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>Bienvenido al dashboard de tu aplicación.</p>
      <button className="dashboard-button" onClick={accessProtectedResource}>
        Acceder a Recurso Protegido
      </button>
      <button className="dashboard-button" onClick={() => navigate('/')}>
        Regresar a la Página Principal
      </button>
    </div>
  );
}

export default Dashboard;
