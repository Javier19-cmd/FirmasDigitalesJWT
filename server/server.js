const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// URL de conexión local por defecto de MongoDB
const mongoURI = 'mongodb://localhost:27017/JWT';

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));


app.post('/register', async (req, res) => {
  const secret = process.env.JWT_SECRET;
  console.log("Hola, este es el JWT_SECRET: ", process.env.JWT_SECRET);
});