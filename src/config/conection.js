const { Sequelize } = require('sequelize');
const { config } = require('dotenv');
const mysql2 = require('mysql2');
config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    define: {
        timestamps: false
    },
    logging: console.log
});

(async () => {
    try {
        await db.authenticate();
        console.log('Koneksi database berhasil.');
    } catch (err) {
        console.error('Koneksi database gagal:', err);
    }
})();

module.exports = db;