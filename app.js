const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./src/routes/auth.route')
const hotelsRouter = require('./src/routes/hotels.route')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/hotels', hotelsRouter)


// app.use('', (req, res) => {
//     console.log(req.url);
//     setTimeout(() => {
//         res.json({ "message": "Success" })
//     }, 2000)
// })
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(res => {
        app.listen(process.env.PORT, () => { console.log('Listening at ' + process.env.PORT); })
    })
    .catch(err => {
        console.log('Network not available...');
        app.use('', (req, res) => {
            res.status(500).send({ error: 'Network not available...' })
        })
    })
