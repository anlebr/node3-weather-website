const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Anders'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anders'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecast) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })

        })
    })



})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'I will help you!',
        title: 'Help',
        name: 'Anders'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Anders',
        errorText: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Anders',
        errorText: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})