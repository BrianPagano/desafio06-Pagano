const { Router } = require('express')
const Users = require('../DAO/models/user.model')
const {createHash} = require('../utils/cryp-password.util')
const router = Router()

router.post ('/', async (req, res) => {
    try {
        const {first_name,last_name,age,email,password} = req.body
        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password: createHash (password),
        }
        console.log ('NewUserInfo:', newUserInfo)
        const user = await Users.create(newUserInfo)
        res.json ({status: 'success', messae: user })
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router