const fetch = require("node-fetch");

//return weather data from API given latitude and longtitude
const fetchWeatherData = async (coord) => {
  try {
    const response = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coord.lat},${coord.lng}`
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

//retun a co-ordinate object given a city name, or a string response if no city was found
const getCity = async (cityName) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
    );
    if (response.ok) {
      const cityData = await response.json();
      //search through the city data for a match
      const city = cityData.find((cityObj) => cityObj.name === cityName);
      if (city) {
        return { lat: city.lat, lng: city.lng };
      }
      return `No results found for ${cityName}`;
    } else {
      throw new Error("Unable to retrieve cities");
    }
  } catch (err) {
    throw err;
  }
};

//return a string stating the hottest day given an array of day objects
const getHottestDay = (days) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //retrieve object with hottest temperature
  const hottestDayObj = days.reduce((prev, current) =>
    +prev.temperatureMax > +current.temperatureMax ? prev : current
  );
  const hottestDateObj = new Date(hottestDayObj.time * 1000);
  const hottestDay = daysOfWeek[hottestDateObj.getDay()];

  return `This week the hottest day will be ${hottestDay}`;
};

//return a string with amount of each type of weather given an array of day objects
const getWeatherFrequencies = (days) => {
  let frequencies = {};

  //extract the icon from each day and increase its frequency by 1 for each occurance
  days.map((day) => {
    let icon = day.icon;
    if (frequencies[icon]) {
      frequencies[icon]++;
    } else {
      frequencies[icon] = 1;
    }
  });

  //renaming for output to the user
  if (frequencies["partly-cloudy-day"]) {
    frequencies["partly cloudy"] = frequencies["partly-cloudy-day"];
    delete frequencies["partly-cloudy-day"];
  }
  //renaming for output to the user
  if (frequencies["clear-day"]) {
    frequencies["clear"] = frequencies["clear-day"];
    delete frequencies["clear-day"];
  }
  let weatherFrequencies = `This week we should have`;

  //generate the return string
  const frequencyLength = Object.keys(frequencies).length;
  Object.keys(frequencies).map((frequency, index) => {
    let count = frequencies[frequency];
    if (index < frequencyLength - 2) {
      weatherFrequencies = weatherFrequencies + ` ${count} days ${frequency},`;
    } else if (index === frequencyLength - 2) {
      weatherFrequencies = weatherFrequencies + ` ${count} days ${frequency}`;
    } else {
      weatherFrequencies =
        weatherFrequencies + ` and ${count} days ${frequency}`;
    }
  });

  return weatherFrequencies;
};

module.exports.fetchWeatherData = fetchWeatherData;
module.exports.getWeatherForecast = getWeatherForecast;
module.exports.getCity = getCity;
module.exports.getHottestDay = getHottestDay;
module.exports.getWeatherFrequencies = getWeatherFrequencies;
