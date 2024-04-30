const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./modelos/User.js');
require('dotenv').config();

app.use(express.json());

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


// Registro de usuarios
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    // Aquí deberías agregar el nuevo usuario a tu base de datos
    // Por ejemplo: await db.user.create({ username, password: hashedPassword });

    //console.log("Modelo: ", db.user)

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send('Usuario registrado');
});

// Login de usuarios
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Aquí deberías buscar el usuario en tu base de datos
    // Por ejemplo: const user = await db.user.findOne({ where: { username } });
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Autenticación fallida');
    }else {
        const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token });
    }

    //res.status(200).send('Autenticación exitosa');
});

// Acceso a recurso protegido
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido');

        res.status(200).send('Acceso concedido');
    });
});