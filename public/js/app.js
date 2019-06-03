// fetch('http://puzzle.mead.io/puzzle').then ((response)=>{
// response.json().then((data)=>{
// console.log(data)
// })
// })
// fetch('http://localhost:3000/weather?address=Kuwait').then ((response)=>{
// response.json().then((data)=>{
//     if(data.error) {
//         console.log(data.error)
//     }else{
//         console.log(data.latitude)
//         console.log(data.longitude)
//         console.log(data.Place_Name)
//         console.log(data.result.summary)
//         // console.log(data.result.precipType)
//         console.log(data.result.temperature)
//     }
// //console.log(data)
// })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const searchButton = document.querySelector('#searchBtn')

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const location = search.value
    fetch('/weather?address=' + location).then(function(response){
        response.json().then(function(data) {
            if (data.error) {
                document.querySelector('table').style = 'visibility: hidden;'
                console.log(data.error)
                alert(data.error)
            } else {
                
                document.querySelector('table').style = 'visibility: visible;'
                // console.log(data.latitude)
                // console.log(data.longitude)
                // console.log(data.Place_Name)
                document.querySelector('#cityName').textContent = data.Place_Name
                // console.log(data.result.summary)
                document.querySelector('#citySummery').textContent = data.result.summary
                // console.log(data.result.precipType)
                // console.log(data.result.temperature)
                document.querySelector('#cityTemp').textContent = data.result.temperature
            }
            //console.log(data)
        })
    })
    

})