const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

module.exports = {
    generateToken: (payload) => {
        const data = {
            ...payload
        }

        return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: 604800 });
    },

    verifikasi: (req, res, next) => {
        const token = req.header('Authorization')

        if (!token) {
            return res.status(401).json({
                status: 'failed',
                message: 'Anda harus login terlebih dahulu'
            });
        }

        try {
            const decodedPayload = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
            req.user = decodedPayload;
            next();
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: 'Token tidak valid'
            });
        }
    }
}