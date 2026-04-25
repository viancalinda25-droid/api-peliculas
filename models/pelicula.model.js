import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

// modelo de peliculas
export const Pelicula = sequelize.define('Pelicula', 
    {
    titulo: 
    {
        type: DataTypes.STRING,
        allowNull: false 
    },
    genero: DataTypes.STRING,
    año: DataTypes.INTEGER 
});