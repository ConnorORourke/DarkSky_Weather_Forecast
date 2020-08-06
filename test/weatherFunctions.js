const expect = require("chai").expect;
const sinon = require("sinon");
const fetch = require("node-fetch");

const {
  fetchWeatherData,
  getWeatherForecast,
  getCity,
  getHottestDay,
  getWeatherFrequencies,
} = require("../functions/weatherFunctions");

//testing fetchWeatherData function
describe("fetchWeatherData()", () => {
  it("should throw an error if there isn't an ok response from the server", () => {
    sinon.stub(fetch, "Promise").returns({ ok: false });

    return fetchWeatherData({ lat: 60.59329987, lng: -1.44250533 }).catch(
      (err) => {
        fetch.Promise.restore();
        expect(err.message).to.equal("Unable to retrieve weather data");
      }
    );
  });

  it("should return an object with data at object.currently.summary", () => {
    return fetchWeatherData({ lat: 60.59329987, lng: -1.44250533 }).then(
      (result) => {
        expect(result).to.have.property("currently");
        expect(result.currently).to.have.property("summary");
      }
    );
  });

  it("should return an object with data at object.hourly.summary", () => {
    return fetchWeatherData({ lat: 60.59329987, lng: -1.44250533 }).then(
      (result) => {
        expect(result).to.have.property("hourly");
        expect(result.hourly).to.have.property("summary");
      }
    );
  });

  it("should return an object with data at object.currently.precipProbability", () => {
    return fetchWeatherData({ lat: 60.59329987, lng: -1.44250533 }).then(
      (result) => {
        expect(result).to.have.property("currently");
        expect(result.currently).to.have.property("precipProbability");
      }
    );
  });
  it("should return an object with data at object.daily.data", () => {
    return fetchWeatherData({ lat: 60.59329987, lng: -1.44250533 }).then(
      (result) => {
        expect(result).to.have.property("daily");
        expect(result.daily).to.have.property("data");
      }
    );
  });
});

//testing getWeatherForecast function
describe("getWeatherForecast()", () => {
  it("should return the correct weather forecast for a given input", () => {
    const weatherData = {
      currently: {
        summary: "Mostly Cloudy",
        precipProbability: "0.1",
      },
      hourly: {
        summary: "Possible light rain.",
      },
    };
    const weatherForecast = getWeatherForecast(weatherData);
    expect(weatherForecast).to.equal(
      "Current weather - Mostly Cloudy, Today we will see - Possible light rain. with a 10% chance of rain."
    );
  });
});

//testing getCity function
describe("getCity()", () => {
  it("should throw an error if there isn't an ok response from the server", () => {
    sinon.stub(fetch, "Promise").returns({ ok: false });
    return getCity("London").catch((err) => {
      fetch.Promise.restore();
      expect(err.message).to.equal("Unable to retrieve cities");
    });
  });

  it("should return a string for an invalid city name", () => {
    sinon.stub(fetch, "Promise").returns({
      ok: true,
      json: () => {
        return [{}];
      },
    });
    return getCity("invalid_city_name").then((result) => {
      fetch.Promise.restore();
      expect(result).to.equal("No results found for invalid_city_name");
    });
  });

  it("should return a co-ordinate object for a server response with city details", () => {
    sinon.stub(fetch, "Promise").returns({
      ok: true,
      json: () => {
        return [{ name: "London", lat: 1, lng: 2 }];
      },
    });
    return getCity("London").then((result) => {
      fetch.Promise.restore();
      expect(result).to.have.property("lat");
      expect(result).to.have.property("lng");
    });
  });
});

//testing getHottestDay function
describe("getHottestDay()", () => {
  it("should return a string with the hottest day of the week", () => {
    let days = [
      { dayForReference: "Monday", time: 1596412800, temperatureMax: 10 },
      { dayForReference: "Tuesday", time: 1596499200, temperatureMax: 20 },
      { dayForReference: "Wednesday", time: 1596585600, temperatureMax: 30 },
      { dayForReference: "Thursday", time: 1596672000, temperatureMax: 20 },
      { dayForReference: "Friday", time: 1596758400, temperatureMax: 31 },
      { dayForReference: "Saturday", time: 1596844800, temperatureMax: 30 },
      { dayForReference: "Sunday", time: 1596931200, temperatureMax: -40 },
    ];

    const result = getHottestDay(days);
    expect(result).to.equal("This week the hottest day will be Friday");
  });
});

//testing getWeatherFrequencies function
describe("getWeatherFrequencies()", () => {
  it("should return the correct output for the given input", () => {
    let days = [
      { icon: "partly-cloudy-day" },
      { icon: "clear-day" },
      { icon: "partly-cloudy-day" },
      { icon: "rain" },
    ];

    let result = getWeatherFrequencies(days);

    expect(result).to.contain("1 days rain");
    expect(result).to.contain("2 days partly cloudy");
    expect(result).to.contain("1 days clear");
  });

  it("should return the correct output for the given input", () => {
    let days = [
      { icon: "snow" },
      { icon: "snow" },
      { icon: "partly-cloudy-day" },
      { icon: "rain" },
    ];

    let result = getWeatherFrequencies(days);

    expect(result).to.contain("1 days partly cloudy");
    expect(result).to.contain("2 days snow");
    expect(result).to.contain("1 days rain");
  });

  it("should return the correct output for the given input", () => {
    let days = [
      { icon: "clear-day" },
      { icon: "rain" },
      { icon: "partly-cloudy-day" },
      { icon: "rain" },
      { icon: "rain" },
      { icon: "rain" },
      { icon: "thunder" },
    ];

    let result = getWeatherFrequencies(days);

    expect(result).to.contain("1 days clear");
    expect(result).to.contain("4 days rain");
    expect(result).to.contain("1 days thunder");
    expect(result).to.contain("1 days partly cloudy");
  });
});
