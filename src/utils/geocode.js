const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + // for special  character 
        '.json?access_token=pk.eyJ1IjoiYWxxYXR0YW4yMDAwIiwiYSI6ImNqdzBrdGFqajBiOGgzenBzNmJodHZkMzIifQ.Z-B62r9rORRyFr0X5IFx4w&limit=1'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try anther search.', undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Place_Name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode