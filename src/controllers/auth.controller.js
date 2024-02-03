const { Router } = require('express')
const Users = require('../DAO/models/user.model')
const { useValidPassword, createHash } = require('../utils/cryp-password.util')
const router = Router()


router.post ('/', async (req, res) => {
    try {
        const {email,password} = req.body
        const user = await Users.findOne({email})
        if (!user) {
            return res.status(401).json({ message: 'unauthorized' })
        }
        if (!useValidPassword (user, password)) {
           return res.status(401).json({ message: 'unauthorized' })
        }

        const lowercaseEmail = email.toLowerCase();

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: lowercaseEmail,
            age: user.age,
            role: user.role,
        }
        res.json ({status: 'success', message: 'Login Succesfull'})
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            } else {
                return res.status(200).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: error })
    }
})

router.post('/forgotPassword', async (req, res) => {
    try {
        const {email,password} = req.body
        const passwordEncrypted = createHash(password)
        await Users.updateOne ({email}, {password: passwordEncrypted})
        res.status(200).json ({status: 'Success', message: 'Password Updated'})
    } catch (error) {
    console.error ('Error:', error.message)
    res.status(500).json({ error: error })
    }
})

module.exports = router