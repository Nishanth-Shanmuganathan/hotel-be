const express = require('express')

const authRouter = express.Router()

const { register, login, authenticate } = require('./../controllers/auth.controller')

authRouter.post('/login', login)

authRouter.post('/register', register)

module.exports = authRouter