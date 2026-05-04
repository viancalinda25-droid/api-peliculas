import express from 'express';
import jwt from 'jsonwebtoken';
import * as service from '../services/peliculas.service.js';

const router = express.Router();

// validar api key
const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;

    if (apiKey === '12345') {
        next();
    } else {
        res.status(403).send('Acceso Prohibido: API Key inválida');
    }
};

// validar token
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

// obtener todas las peliculas
router.get('/', validarApiKey, validarToken, async (req, res) => {
    const peliculas = await service.getAll();
    res.json(peliculas);
});

// obtener una pelicula por id
router.get('/:id', validarApiKey, validarToken, async (req, res) => {
    const pelicula = await service.getById(req.params.id);
    res.json(pelicula);
});

// crear pelicula
router.post('/', validarApiKey, validarToken, async (req, res) => {
    const nueva = await service.create(req.body);
    res.json(nueva);
});

// actualizar pelicula
router.put('/:id', validarApiKey, validarToken, async (req, res) => {
    const actualizada = await service.update(req.params.id, req.body);
    res.json(actualizada);
});

// eliminar pelicula
router.delete('/:id', validarApiKey, validarToken, async (req, res) => {
    await service.remove(req.params.id);
    res.send('Eliminado');
});

export default router;