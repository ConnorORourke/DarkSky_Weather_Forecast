const {
  fetchWeatherData,
  getWeatherForecast,
  getCity,
  getHottestDay,
  getWeatherFrequencies,
} = require("./functions/weatherFunctions");

//main function which executes after user enters "node index.js townName" in the terminal
const run = async () => {
  try {
    let weatherForecast = "";
    let hottestDay = "";
    let weatherFrequencies = "";

    //fetch city data, if there is any, passing in user input
    let response = await getCity(process.argv[2]);

    //object response means there is data
    if (typeof response === "object") {
      //fetch weather data
      const weatherData = await fetchWeatherData(response);

      //populate weather forecast, hottest day and weather frequency data
      weatherForecast = getWeatherForecast(weatherData);
      hottestDay = getHottestDay(weatherData["daily"]["data"]);
      weatherFrequencies = getWeatherFrequencies(weatherData["daily"]["data"]);
    }
    //otherwise the response is a string warning that no city was found
    else {
      weatherForecast = response;
    }

    //output data to user
    console.log(weatherForecast);
    console.log(hottestDay);
    console.log(weatherFrequencies);
  } catch (err) {
    console.log(err.message);
  }
};

run();
