const expect = require("chai").expect;
const sinon = require("sinon");
const fetch = require("node-fetch");

const {
  fetchWeatherData,
  getWeatherForecast,
  getCity,
} = require("../functions/weatherFunctions");

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
        expect(result.currently).to.have.property("summary");
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
});

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
