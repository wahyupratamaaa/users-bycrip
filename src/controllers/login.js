const express = require('express')
const router = express.Router()
const User = require('../models/model_user')
const { password_verify } = require('../config/encryp')
const { generateToken } = require('../config/middlewere')

const response = {
    status: 'failed',
    message: 'aksi gagal di lakukan',
    data: []
}

router.post('/', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ where: { username: username } })

        if (user) {
            const verify = password_verify(password, user.password)

            if (verify) {
                const { password, ...userData } = user.dataValues
                response.status = 'success'
                response.message = 'Contoh penggunaan password verify'
                response.data = {
                    ...userData,
                    token: generateToken({
                        id: user.id,
                        username: userData.username,
                        nomor: userData.nomor
                    })
                }
            } else {
                response.message = 'Sandi salah'
            }
        }
    } catch (error) {
        console.warn(error)
    }

    res.status(200).json(response)
})

module.exports = router