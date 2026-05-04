import express from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import { sequelize } from './db.js';
import peliculasRoutes from './routers/peliculas.router.js';

const app = express();
const port = 3000;

app.use(express.json());

// middleware para guardar logs
const logger = (req, res, next) => {
    const log = `${new Date().toLocaleString()} - ${req.method} en ${req.url}\n`;
    const ruta = path.join(import.meta.dirname, 'log.txt');

    fs.writeFileSync(ruta, log, { flag: 'a' });
    next();
};

app.use(logger);

// middleware para validar api key
const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;

    if (apiKey === '12345') {
        next();
    } else {
        res.status(403).send('Acceso Prohibido: API Key inválida');
    }
};

// middleware para validar token
const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Token requerido');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secreto123', (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }

        next();
    });
};

// 🔐 login (genera token)
app.post('/login', (req, res) => {
    const { user, password } = req.body;

    if (user === 'admin' && password === '1234') {
        const token = jwt.sign({ user }, 'secreto123', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

// rutas de peliculas (protegidas)
app.use('/peliculas', validarApiKey, validarToken, peliculasRoutes);

// ruta base
app.get('/', validarApiKey, (req, res) => {
    res.send('API - OK');
});

// manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: 'Algo salió mal',
        mensaje: err.message
    });
});

// iniciar servidor
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Servidor iniciado en el puerto 3000');
    });
});