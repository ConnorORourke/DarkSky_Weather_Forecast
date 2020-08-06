const expect = require("chai").expect;
const sinon = require("sinon");
const fetch = require("node-fetch");

const {
  fetchWeatherData,
  getWeatherForecast,
} = require("../functions/weatherFunctions");

describe("fetchWeatherData()", () => {
  it("should throw an error if there isn't an ok response from the server", (done) => {
    sinon.stub(fetch, "Promise").returns(
      Promise.resolve({
        ok: false,
      })
    );

    fetchWeatherData(60.59329987, -1.44250533)
      .then((result) => {
        done();
      })
      .catch((err) => {
        expect(err.message).to.equal("Unable to retrieve weather data");
        done();
      });
    fetch.Promise.restore();
  });

  it("should return an object with data at object.currently.summary", (done) => {
    fetchWeatherData(60.59329987, -1.44250533)
      .then((result) => {
        expect(result).to.have.property(currently.summary);
        done();
      })
      .catch((err) => {
        done();
      });
  });
  it("should return an object with data at object.hourly.summary", (done) => {
    fetchWeatherData(60.59329987, -1.44250533)
      .then((result) => {
        expect(result).to.have.property(hourly.summary);
        done();
      })
      .catch((err) => {
        done();
      });
  });

  it("should return an object with data at object.currently.precipProbability", (done) => {
    fetchWeatherData(60.59329987, -1.44250533)
      .then((result) => {
        expect(result).to.have.property(currently.precipProbability);
        done();
      })
      .catch((err) => {
        done();
      });
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
