const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/fbb9405b02be1c393531c14404fe3d26/' + encodeURIComponent(latitude) +
    ',' + encodeURIComponent(longitude) + '?units=si'

    request({url, json : true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
            ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })

}


module.exports = forecast