const express = require('express')

const { authenticate } = require('../controllers/auth.controller')

const hotelRouter = express.Router()

const data = [
    {
        id: 7467,
        name: 'Sri Krishna Bakery',
        street: 'Kasimedu kuppam',
        landmark: 'Opp BeachRoad',
        city: 'Chennai',
        likes: 65
    },
    {
        id: 2867,
        name: 'Adayar Anandha Bhavan',
        street: 'Karur main road',
        landmark: 'Near KVB central',
        city: 'Karur',
        likes: 45
    },
    {
        id: 27467,
        name: 'Madurai Muniaandi Vilas',
        street: 'Keelakadai Veedhi',
        landmark: 'Near Syndicate Bank',
        city: 'Madurai',
        likes: 88
    },
    {
        id: 28746,
        name: 'Dindigul Thalapakatti Briyani',
        street: 'Main road',
        landmark: 'Near Roundana',
        city: 'Dindigul',
        likes: 100
    },
    {
        id: 2874,
        name: 'Kongu Food Stall',
        street: 'KEC Nagar',
        landmark: 'Near Dheeran Hostel',
        city: 'Erode',
        likes: 52
    }
]
hotelRouter.get('', authenticate, (req, res) => {
    res.send({ data, user: req.user })
})

hotelRouter.get('/:search', authenticate, (req, res) => {
    const hotelName = req.params.search
    const filteredData = data.filter(ele => ele.name.toLowerCase().includes(hotelName.toLowerCase()))
    res.send({ data: filteredData, user: req.user })
})


hotelRouter.get('/dishes', authenticate, (req, res) => {

    setTimeout(() => {

        res.send({ data, user: req.user })
    }, 2000)
})

module.exports = hotelRouter