// to make the http request from client side we use fetch API
//like http function the fetch fun is async so we have to wait for the data to come 
//and when they do it is a trigger to a fun
//for fetch it is slightly different we use the then extention
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    //this returns the json parsed to data
    //!!.json() IS ASYNC ON THE CONTRARY WITH .parse which is sync 
    // if i have a huge payload then its gonna freeze with .parse
    response.json().then((data) => {
        console.log(data)
    })
}) 

//const url = 'http://localhost:3000/weather?address=Thessaloniki'


//select a specific element from the HTML page (ONLY THE FIRST)
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'



//we use eventlisteners when we want things to happen during our exp on the web (e.g click a button)
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const location = search.value //extracts the value of the query
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    console.log(location)
    //keep the code above 
    //doesnt let the browser refresh

    let url = 'http://localhost:3000/weather?address=' + location
    
    fetch(url).then((response) => {
        console.log(response)
        
       response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }else {
            console.log(data)
            messageOne.textContent = data.name
            messageTwo.textContent = data.forecast
        }})
    })


})