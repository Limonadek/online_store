const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'postgres', 
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)