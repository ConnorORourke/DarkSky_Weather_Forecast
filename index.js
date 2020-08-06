const {
  fetchWeatherData,
  getWeatherForecast,
  getCity,
  getHottestDay,
  getWeatherFrequencies,
} = require("./functions/weatherFunctions");

const run = async () => {
  try {
    let weatherForecast = "";
    let hottestDay = "";
    let weatherFrequencies = "";

    //fetch city data, if there is any, passing in user input
    let response = await getCity(process.argv[2]);
    if (typeof response === "object") {
      const weatherData = await fetchWeatherData(response);
      weatherForecast = getWeatherForecast(weatherData);
      hottestDay = getHottestDay(weatherData["daily"]["data"]);
      weatherFrequencies = getWeatherFrequencies(weatherData["daily"]["data"]);
    } else {
      weatherForecast = response;
    }
    console.log(weatherForecast);
    console.log(hottestDay);
    console.log(weatherFrequencies);
  } catch (err) {
    console.log(err.message);
  }
};

run();
