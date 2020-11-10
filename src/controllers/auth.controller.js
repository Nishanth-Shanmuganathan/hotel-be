const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/user.model')


exports.register = async (req, res) => {
    if (req.body.password !== req.body['confirm password']) {
        console.log('error');
    }
    try {
        const email = req.body.email
        const password = await bcrypt.hash(req.body.password, 8)
        const username = email.split('@')[0]
        const user = new User({
            email,
            password,
            username
        })
        user.token = await jwt.sign({ id: user._id }, process.env.JWT_STRING)
        await user.save()
        res.status(201).send({ user })
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message })
    }
}


exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email })

        const passwordValidity = await bcrypt.compare(password, user.password)
        if (!user || !passwordValidity) {
            return res.status(400).json({ error: 'Invalid login credentials...' })
        }

        user.token = await jwt.sign({ id: user._id }, process.env.JWT_STRING)
        res.status(200).send({ user })
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const { id } = jwt.decode(token, process.env.JWT_STRING)
        const user = await User.findById(id)
        req.user = user
        next()
    } catch (error) {
        res.status(403).send(error)
    }
}