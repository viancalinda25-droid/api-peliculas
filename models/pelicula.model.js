import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

// modelo de peliculas
export const Pelicula = sequelize.define('Pelicula', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false // el titulo es obligatorio
    },
    genero: DataTypes.STRING,
    año: DataTypes.INTEGER // año de la pelicula
});