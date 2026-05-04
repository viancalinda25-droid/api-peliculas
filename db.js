import { Sequelize } from 'sequelize';

// conexion a sqlite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // archivo de la base de datos
});