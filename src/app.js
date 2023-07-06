const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)//path to the dir the current script is in

//we can manipulate paths with this method
console.log(path.join(__dirname, '../public'))
//console.log(__filename)//path THE FILE is 

const app = express()
//for heroku
const port = process.env.PORT || 3000



const publicDirectoryPath = path.join(__dirname, '../public')

//right now the hbs are only available and readable in views dir
//and if i change the name of the dir its not gonna work
//to fix it i need to tell the express where to look
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//serve up the dir/customize server
//static takes as arg the path to the folder we want to serve up
//express is a view engine
//set hbs/tell express which template engine we installed
//we use handlebars to set dymanic templates
//which means for e.g i want to have a specific header to all my pages
app.set('view engine','hbs')
app.set('views', viewsPath) //according to documentation at express.com the key/values used are specific

//set up the partials
//partials are parts of a file (e.g. html webpage)
hbs.registerPartials(partialPath)

//app.set('views', path.join(__dirname, '../views'));
app.use(express.static(publicDirectoryPath))


//!!!!IN THE HBS FILE !!!!to inject a value to a hbs file we use the {{}} to access the elements available -->
app.get('', (req, res)=> {
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Tryf'
    }) //for dynamic views we can render our handlebars

})

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        title: 'About me',
        name: 'Tryf'
    }) //for dynamic views we can render our handlebars

})

app.get('/help', (req, res)=> {
    res.render('help.hbs', {
        message: 'SOS i need help',
        title: 'Help',
        name: 'Tryf'
 }) //for dynamic views we can render our handlebars

})
//what the server should do when
//sb try to get the resource from a url
//app.get is creating new routes
//1st arguement is a route e.g /help
//2nd arg is a fun. Her 1st arg is an object with info about the incoming request to the server
//her 2nd is the response
//sends a json file


// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Tryf',
//         age: 22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
           error: 'You need to provide an address'
        })
    }

    geocode(req.query.address, (error, {name, latitude, longitude} = {}) => {
        if(error){ 
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                name,
                address: req.query.address4
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'it is raining',
    //     location: 'Greece'
    // })
})  

app.get('/products', (req, res) => {
    if(!req.query.search) {
         return res.send({
            error: 'Must provide search'
        })
    }

    //console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tryf',
        errorMessage: 'Article not found'
    })
})


//anything else *
app.get('*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Tryf',
        errorMessage: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

//going to turn the server on 
// on a specific port
app.listen(port, () => {
    console.log('server is up on port ' +  port)
})