const APIkey = "&appid=54f241fdd09f1d10ee0b6e1696fe5d01"

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="

var forecast5Day = "https://api.openweathermap.org/data/2.5/forecast?q="

//Todo: make call to openweather

var getCityWeather = function(city){
  var APIcall=  currentWeather+city+APIkey;
  fetch(APIcall)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    displayWeather(data);
  });
}

var submitHandler = function(event){
    event.preventDefault();
    var cityName = citySearch.value.trim();
    console.log(cityName);

    if (cityName){
        getCityWeather(cityName);
        citySearch.innerHTML=("");
    }
};
let displayWeather = function(weatherData) {

  // format and display the values
  $("#currentCity").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
  $("#temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
  $("#humid").text("Humidity: " + weatherData.main.humidity + "%");
  $("#wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");
};

searchArea.addEventListener("click",submitHandler);

//display current weather: icon, date, temp, wind, humidity 

//display 5 day forecast: icon, date, temp, wind, humidity 
 
//save search history and display to page