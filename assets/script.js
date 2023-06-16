const APIkey = "&appid=54f241fdd09f1d10ee0b6e1696fe5d01"

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="

var forecast5Day = "https://api.openweathermap.org/data/2.5/forecast?q="

var searchHistory = []

var lastCitySearched = ""
//Todo: make call to openweather

var getCityWeather = function(city){
  var APIcall=  currentWeather+city+APIkey+"&units=imperial";
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

  // displays the current weather for selected city.
  //dayjs formats the info to have the date displayed
  $("#currentCity").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
  $("#temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
  $("#humid").text("Humidity: " + weatherData.main.humidity + "%");
  $("#wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");

  lastCitySearched = weatherData.name;

  // saves city used to history
  saveSearchHistory(weatherData.name);
};

let saveSearchHistory = function (city) {
  //if there is anything in search history, adds a link to re-click it and show to page again
  if(!searchHistory.includes(city)){
      searchHistory.push(city);
      $("#searchHistory").append("<a href='#' id='" + city + "'>" + city + "</a>")
  } 

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIkey+"&units=imperial")
  .then(function(response) {
      response.json().then(function(data) {

          // clear any previous entries in the 5day forecast
          $("#5dayDisplay").empty();

          // get every 8th value (24hours) in the returned array from the api call
          for(i = 7; i <= data.list.length; i += 8){

              // creates 5 day forecast
              let fiveDays =`
              <div class = "column">
                  <div>
                      <h5>` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h5>
                      <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png">
                      <p>Temp: ` + data.list[i].main.temp + `</p>
                      <p>Humidity: ` + data.list[i].main.humidity + `</p>
                      <p>Wind: ` + data.list[i].wind.speed + ` <p>
                  </div>
              </div>
              `;

              // append the day to the five-day forecast
              $("#5dayDisplay").append(fiveDays);
         }
      })
  });

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

  // if nothing is in local storage, makes the empty array and displays nothing to page
  if (!searchHistory) {
      searchHistory = []
  }

  if (!lastCitySearched) {
      lastCitySearched = ""
  }

  // clear out the search history 
  $("#searchHistory").empty();

  // for loop that will run through all the cities in the array
  for(i = 0 ; i < searchHistory.length ;i++) {

      //creates the list of prior searched cities
      $("#searchHistory").append("<a href='#' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
  }
};

loadSearchHistory();

$("#searchArea").on("click",submitHandler);

//click function for the prior history list to make them re-populate to page
$("#searchHistory").on("click", function(event){
  let prevCity = $(event.target).closest("a").attr("id");
  getCityWeather(prevCity);
});
