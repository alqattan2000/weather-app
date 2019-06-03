const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

var datetime = new Date();
const app = express()
// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewPath = path.join(__dirname, '..', 'temp', 'views')
const partialsPath = path.join(__dirname, '..', 'temp', 'partials')

// setup handlebars engine & views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to Serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohammed Qattan'
    })
})



// app.get('', (req, res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        datetime,
        name: 'Mohammed Qattan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohammed Qattan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address?'
        })
    }
    geocode(req.query.address, (error, { 
        latitude,
        longitude,
        Place_Name
    } = {} ) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, result) => {
            if (error) {
                return res.send({error})
            }

            console.log(latitude, longitude, Place_Name)
            console.log(result)
            res.send({
                latitude,
                longitude,
                Place_Name,
                result
            })
        })

    })
   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide a Search !!'
        })
    }
    res.send({
        products: []
    })
})


// must be on bottom

app.get('/help/*', (req, res) => {

    res.render('404page', {
        title: 'Page 404',
        name: 'Mohammed Qattan',
        errorMessage: 'Help Article Not Found'
    })
})
app.get('*', (req, res) => {

    res.render('404page', {
        title: 'Page 404',
        name: 'Mohammed Qattan',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})