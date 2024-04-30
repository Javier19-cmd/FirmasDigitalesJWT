import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProtectedResource.css';

function ProtectedResource() {
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/inWWhr5tnEA');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data !== 'Acceso concedido') {
          throw new Error(response.data);
        } else {
          setMessage('Acceso concedido. Disfruta del video:');
        }

      } catch (error) {
        setMessage('Acceso denegado: ' + (error.response?.data || 'Error al cargar los datos.'));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <p className="message">{message}</p>
      {message.startsWith('Acceso concedido') && (
        <div className="video-container">
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video protegido"
          ></iframe>
        </div>
      )}
      <button className="return-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default ProtectedResource;
