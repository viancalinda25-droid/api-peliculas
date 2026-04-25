import express from 'express';
import * as service from '../services/peliculas.service.js';

const router = express.Router();

// obtener todas las peliculas
router.get('/', async (req, res) => {
    const peliculas = await service.getAll();
    res.json(peliculas);
});

// obtener una pelicula por id
router.get('/:id', async (req, res) => {
    const pelicula = await service.getById(req.params.id);
    res.json(pelicula);
});

// crear pelicula
router.post('/', async (req, res) => {
    const nueva = await service.create(req.body);
    res.json(nueva);
});

// actualizar pelicula
router.put('/:id', async (req, res) => {
    const actualizada = await service.update(req.params.id, req.body);
    res.json(actualizada);
});

// eliminar pelicula
router.delete('/:id', async (req, res) => {
    await service.remove(req.params.id);
    res.send('Eliminado');
});

export default router;