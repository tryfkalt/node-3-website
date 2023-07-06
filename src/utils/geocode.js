const request = require('request')

// callback function and callback pattern it is standard
// to use 2 arguement when declaring the fun, the error and "response"

const geocode = (address, callback) => {
    const pos_url = 'http://api.positionstack.com/v1/forward?access_key=3b4eb0fc4d182fcf38c125628f0990a6&query=' + address
    //we need to add address in our url
    request( {url: pos_url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect', undefined)
        } else if (body.data.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                name: body.data[0].name,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            })
        }
    })
}

module.exports = geocode