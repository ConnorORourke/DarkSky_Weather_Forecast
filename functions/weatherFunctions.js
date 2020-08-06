const fetch = require("node-fetch");

//retrieve weather data from API given latitude and longtitude
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

module.exports.fetchWeatherData = fetchWeatherData;
