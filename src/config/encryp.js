const bcrypt = require('bcryptjs')
const { config } = require('dotenv')
config()

module.exports = {
    password_hash: (string) => {
        const salt = bcrypt.genSaltSync(parseInt(process.env.ENCRYP_LENGTH))
        const hash = bcrypt.hashSync(string, salt)
        return hash
    },

    password_verify: (string, hash) => {
        return bcrypt.compareSync(string, hash)
    }
}
