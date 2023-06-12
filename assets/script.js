const APIkey = "&appid=54f241fdd09f1d10ee0b6e1696fe5d01"

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="

var forecast5Day = "https://api.openweathermap.org/data/2.5/forecast?q="

var searchHistory = []

var lastCitySearched = ""
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

  lastCitySearched = weatherData.name;

  // save to the search history using the api's name value
  saveSearchHistory(weatherData.name);
};

let saveSearchHistory = function (city) {
  if(!searchHistory.includes(city)){
      searchHistory.push(city);
      $("#searchHistory").append("<a href='#' id='" + city + "'>" + city + "</a>")
  } 

  // save the searchHistory array to local storage
  localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));

  // save the lastCitySearched to local storage
  localStorage.setItem("lastCitySearched", JSON.stringify(lastCitySearched));

  // display the searchHistory array
  loadSearchHistory();
};

let loadSearchHistory = function() {
  searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
  lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"));

  // if nothing in localStorage, create an empty searchHistory array and an empty lastCitySearched string
  if (!searchHistory) {
      searchHistory = []
  }

  if (!lastCitySearched) {
      lastCitySearched = ""
  }

  // clear any previous values from th search-history ul
  $("#searchHistory").empty();

  // for loop that will run through all the citys found in the array
  for(i = 0 ; i < searchHistory.length ;i++) {

      // add the city as a link, set it's id, and append it to the search-history ul
      $("#searchHistory").append("<a href='#' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
  }
};

loadSearchHistory();

$("#searchArea").on("click",submitHandler);

$("#searchHistory").on("click", function(event){
  // get the links id value
  let prevCity = $(event.target).closest("a").attr("id");
  // pass it's id value to the getCityWeather function
  getCityWeather(prevCity);
});

//display current weather: icon, date, temp, wind, humidity 

//display 5 day forecast: icon, date, temp, wind, humidity 
 
//save search history and display to page