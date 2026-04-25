import express from 'express';
import fs from 'fs';
import path from 'path';

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

// rutas de peliculas
app.use('/peliculas', validarApiKey, peliculasRoutes);

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