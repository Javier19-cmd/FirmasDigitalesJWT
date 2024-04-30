const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { db } = require('./modelos/userModel');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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

    await db.user.create({ username, password: hashedPassword });

    res.status(201).send('Usuario registrado');
});

// Inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Aquí deberías buscar el usuario en tu base de datos
    // Por ejemplo: const user = await db.user.findOne({ where: { username } });
    const user = { username, password };

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Autenticación fallida');
    }

    const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token });
});

// Acceso a recurso protegido
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido');

        res.status(200).send('Acceso concedido');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
