const sequelize = require('sequelize');
const db = require('../config/conection');

const User = db.define('user_table', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: { type: sequelize.STRING },
    nomor: { type: sequelize.STRING },
    alamat: { type: sequelize.STRING },
    username: { type: sequelize.STRING },
    password: { type: sequelize.STRING }
});

module.exports = User