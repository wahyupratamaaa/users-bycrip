const express = require('express')
const router = express.Router()
const User = require('../models/model_user')
const { password_hash } = require('../config/encryp')

const response = {
    status: 'failed',
    message: 'aksi gagal di lakukan',
    data: []
}


router.post('/', async (req, res) => {
    // jika ingin mengambil dangan key yang telah di tentukan
    // bisa menggunakan cara ini atau gunakan (req.body) untuk mengambil data yang lebih dinamis
    const { nama, nomor, alamat, username, password } = req.body

    try {
        /* lakukan query add data */
        const user = await User.create({
            nama: nama,
            nomor: nomor,
            alamat: alamat,
            username: username,
            password: password_hash(password)
        })

        if (user) {
            response.status = 'success'
            response.message = 'Contoh methode POST'
            response.data = user
        }
    } catch (error) {
        console.warn(error)
    }

    res.status(200).json(response)
})

router.get('/', async (req, res) => {
    try {
        /* lakukan query get all data */
        const user = await User.findAll()

        if (user) {
            response.status = 'success'
            response.message = 'Contoh methode GET'
            response.data = user
        }
    } catch (error) {
        console.warn(error)
    }

    res.status(200).json(response)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        /* lakukan query get where id data */
        const user = await User.findOne({ where: { id: id } })

        if (user) {
            response.status = 'success'
            response.message = 'Contoh methode GET dengan mengirimkan parameter [ID]'
            response.data = user
        }
    } catch (error) {
        console.warn(error)
    }

    res.status(200).json(response)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body

    Object.keys(req.body).map(key => {
        if (!req.body[key]) {
            delete data[key]
        }

        if (key === 'password') {
            data[key] = password_hash(data[key])
        }

    })


    try {
        /* lakukan query update data */
        const user = await User.update(data, { where: { id: id } })

        if (user > 0) {
            response.status = 'success'
            response.message = 'Contoh methode PUT dengan mengirimkan parameter [ID]'
        }
    } catch (error) {
        console.warn(error)
    }

    res.status(200).json(response)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    try {
        /* lakukan query delete data */
        User.destroy({ where: { id: id } }).then(data => {
            response.data = data
        })

        response.status = 'success'
        response.message = 'Contoh methode DELETE dengan mengirimkan parameter [ID]'
        response.data = data

    } catch (error) {
        console.warn(error)
    }
})

module.exports = router