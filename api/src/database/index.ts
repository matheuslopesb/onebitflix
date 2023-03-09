import { Sequelize } from 'sequelize';

require("dotenv").config();

export const sequelize = new Sequelize({
    dialect: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    database: 'onebitflix_development',
    username: 'onebitflix', 
    password: process.env.SEQUELIZE_DEVELOPMENT_PASSWORD, 
    define: {
        underscored: true
    }
})