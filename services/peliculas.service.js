import { Pelicula } from '../models/pelicula.model.js';

// obtener todas las peliculas
export const getAll = async () => {
    return await Pelicula.findAll();
};

// buscar una pelicula por id
export const getById = async (id) => {
    return await Pelicula.findByPk(id);
};

// crear una pelicula nueva
export const create = async (data) => {
    return await Pelicula.create(data);
};

// actualizar pelicula
export const update = async (id, data) => {
    const pelicula = await Pelicula.findByPk(id);

    if (!pelicula) {
        return null; // no existe
    }

    return await pelicula.update(data);
};

// eliminar pelicula
export const remove = async (id) => {
    const pelicula = await Pelicula.findByPk(id);

    if (!pelicula) {
        return null; // no existe
    }

    await pelicula.destroy();
    return true;
};