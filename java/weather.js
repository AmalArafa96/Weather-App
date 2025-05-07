let seachInput = document.getElementById('search-input');
let weatherData

seachInput.addEventListener('input' ,function(){
    //console.log('hello')
    if(seachInput.value.length>2){
        startApp(seachInput.value)
    }
   
})

//to run app sequence خطوات 
async function startApp(key){
    weatherData =await  getData(key)
    getTodayData()
    getTomorowData()
    getAfterTomorowData()
    console.log (weatherData )

}
//to catch data from api
async function getData(key){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6329e87e570d433f884170219253004&q=${key}&days=7`);
    let data = await response.json();
    return data;
}
function getTodayData(){
    //اخد نسخه اجيب تاريخ موجود في api
let date = new Date(weatherData.location.localtime)
//عشان احدد شهر ولا يوم ولا سنه
// en-us language
//week day name of day long=monday narrow=m short=mon 
//console.log(date.toLocaleDateString('en-us', {day:'numeric'}))
document.querySelector('.historic #day').innerHTML=date.toLocaleDateString('en-us', {weekday:'long'});
document.querySelector('.historic p span#date').innerHTML=date.toLocaleDateString('en-us', {day:'2-digit'});
document.querySelector('.historic p span#month').innerHTML=date.toLocaleDateString('en-us', {month:'long'});

document.querySelector('.location #city').innerHTML=weatherData.location.name;
document.querySelector('.temp #degree').innerHTML=weatherData.current.temp_c;
//change src for img and replace by paramter
document.querySelector('.status #pic').setAttribute('src', `https:${weatherData.current.condition.icon}`);
document.querySelector('.status .sunny').innerHTML=weatherData.current.condition.text;
document.querySelector('ul li span#humidity ').innerHTML=weatherData.current.humidity +'%' ;
document.querySelector('ul li span#winds ').innerHTML=weatherData.current.wind_mph +'km/h' ;
document.querySelector('ul li span#direction ').innerHTML=weatherData.current.wind_dir;
}
function getTomorowData(){
 let date = new Date(weatherData.forecast.forecastday[1].date)
document.querySelector('.card-footer2 #tomday').innerHTML=date.toLocaleDateString('en-us', {weekday:'long'});
document.querySelector('.box2 #iconn').setAttribute('src','https:' + weatherData.forecast.forecastday[1].day.condition.icon); 
    document.querySelector('.box2 p#text').innerHTML = weatherData.forecast.forecastday[1].day.condition.text; 
    document.querySelector('.box2 p#max').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c + ' c'; 
    document.querySelector('.box2 p#min').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c + ' c'; 
}
function getAfterTomorowData(){
    let date = new Date(weatherData.forecast.forecastday[2].date)
document.querySelector('.card-footer #aftomday').innerHTML=date.toLocaleDateString('en-us', {weekday:'long'});
    document.querySelector('.box2 #tomimg').setAttribute('src','https:' +weatherData.forecast.forecastday[2].day.condition.icon); 
    document.querySelector('.box2 p#tomtext').innerHTML = weatherData.forecast.forecastday[2].day.condition.text; 
    document.querySelector('.box2 p#tommax').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c + ' c'; 
    document.querySelector('.box2 p#tommin').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c + ' c'; 
}


