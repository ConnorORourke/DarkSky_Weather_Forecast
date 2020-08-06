const fetch = require("node-fetch");

//return weather data from API given latitude and longtitude
const fetchWeatherData = async (lat, long) => {
  try {
    const response = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}`
    );
    if (response.ok) {
      const weatherData = await response.json();
      return weatherData;
    } else {
      throw new Error("Unable to retrieve weather data");
    }
  } catch (err) {
    throw err;
  }
};

//return todays weather forecast given weather data
const getWeatherForecast = (weatherData) => {
  const currentSummary = weatherData["currently"]["summary"];
  const hourlySummary = weatherData["hourly"]["summary"];

  //conversion from probabilty between 0 and 1 into percentage value
  const currentlyPrecipProb =
    +weatherData["currently"]["precipProbability"] * 100;

  return `Current weather - ${currentSummary}, Today we will see - ${hourlySummary} with a ${currentlyPrecipProb}% chance of rain.`;
};

module.exports.fetchWeatherData = fetchWeatherData;
module.exports.getWeatherForecast = getWeatherForecast;
