const { Router } = require('express')
const Users = require('../DAO/models/user.model')
const router = Router()
const passport = require ('passport')

router.post ('/', passport.authenticate('register', {failureRedirect: '/api/users/fail-Register'}),  async (req, res) => {
    try {
        res.status(201).json ({status: 'success', messae: 'Usuario' })
     } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get ('/fail-Register', (req, res) => {
    console.log ('Fallo registro')
    res.status(400).json({status: 'error',  error: 'bad Request' })
})

module.exports = router