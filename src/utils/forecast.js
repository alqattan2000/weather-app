const request = require('request')
const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/28b0e7d79bc8d6b9d59787f6c0f1ccdf/' + latitude + ',' + longitude +
        '?exclude=minutely,flags,hourly&units=ca&lang=ar'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Error while retrieving weather')
        } else if (body.error) {
            callback('invalid City Name')
        } else
            callback(undefined, body)
            console.log(body)
    })
}
module.exports = forecast