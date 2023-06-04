const APIkey = "54f241fdd09f1d10ee0b6e1696fe5d01"

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="

var forecast5Day = "https://api.openweathermap.org/data/2.5/forecast?q="

var searchArea = document.getElementById("searchArea")
var weatherDisplay = document.getElementById("weatherDisplay")
var mainDisplay = document.getElementById("mainDisplay")
var fiveDayDisplay = document.getElementById("5dayDisplay")
var searchHistory = document.getElementById("searchHistory")
var citySearch = document.getElementById("citySearch")

//Todo: make call to openweather

var getCityWeather = function(city){
  var APIcall=  currentWeather + city + APIkey;
  fetch(APIcall)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
  });
}


//handle user's input for search

searchArea.addEventListener("click",submitHandler);

var submitHandler = function(event){
    event.preventDefault();
    var cityName = citySearch.value.trim();

    if (cityName){
        getCityWeather(cityName);
        citySearch.innerHTML=("");
    }
};

//display current weather: icon, date, temp, wind, humidity 

//display 5 day forecast: icon, date, temp, wind, humidity 
 
//save search history and display to page