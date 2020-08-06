const {
  fetchWeatherData,
  getWeatherForecast,
  getCity,
} = require("./functions/weatherFunctions");

const run = async () => {
  try {
    //fetch city data, if there is any, passing in user input
    let response = await getCity(process.argv[2]);
    if (typeof response === "object") {
      const weatherData = await fetchWeatherData(response);
      response = getWeatherForecast(weatherData);
    }

    //response will either be the weather forecast, or a message that nothing was found
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
};

run();
