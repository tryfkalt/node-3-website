const request = require('request')

const forecast = (a, b, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=50e0b02c91a9af88d1c88a07a30249b3&query=37.8267,-122.4233'
    const url = 'http://api.weatherstack.com/current?access_key=50e0b02c91a9af88d1c88a07a30249b3&query=' + a + ',' + b + '&units=f'
    
    request({url, json:true}, (error, response) => {
        if(error) {
            callback('Internal error', undefined)
        } else if (response.body.error) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, 'it is currently: ' + response.body.current.temperature + ' degrees out.')
        }
    })
    
}

//deconstructed

// request({url, json:true}, (error, {body}) => {
//     if(error) {
//         callback('Internal error', undefined)
//     } else if (body.error) {
//         callback('Unable to find', undefined)
//     } else {
//         callback(undefined, 'it is currently: ' + body.current.temperature + ' degrees out.')
//     }
// })




module.exports = forecast