const { fetchWeatherData } = require("./functions/weatherFunctions");

const run = async () => {
  try {
    const weatherData = await fetchWeatherData(60.59329987, -1.44250533);
  } catch (err) {
    console.log(err.message);
  }
};

run();
