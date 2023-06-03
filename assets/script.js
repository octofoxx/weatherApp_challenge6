const APIkey = "54f241fdd09f1d10ee0b6e1696fe5d01"

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"

var forecast5Day = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

var cityCode = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"

var searchArea = document.getElementById("#searchArea")


var weatherDisplay = document.getElementById("#weatherDisplay")


var mainDisplay = document.getElementById("#mainDisplay")


var fiveDayDisplay = document.getElementById("#5dayDisplay")
