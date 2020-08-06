# DarkSky_Weather_Forecast

This command line application uses the Dark Sky API to retrieve data about the weather for any town inputted by the user. It will tell the user about the current weather, as well as an overview of the day's weather and the chance of rain. It will also inform the user which day will be the hottest this week, and how much of each type of weather is expected this week (e.g. 3 days cloudy, 2 days clear and 2 days rain).

# Installation and how to use

1. you will need NodeJS and Node Package Manager installed to run this application, as well as your own API key for Dark Sky
2. download or clone this repository to your local files
3. run "npm install" in the terminal at the root of the project to install the project dependencies
4. set the DARKSKY_API_KEY environment variable to your API key
5. in your terminal, run "node index.js nameOfTown" at the root of the project

# Tests

1. To test the applicaiton, you will need to ensure Mocha is installed globally (npm install -g mocha)
2. Run "mocha" in the terminal at the root of the project to run the tests
