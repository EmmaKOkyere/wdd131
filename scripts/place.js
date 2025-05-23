const today = new Date();
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperature = document.querySelector("#temperature");
const wind = document.querySelector("#wind");
const windChill = document.querySelector("#windChill");

currentYear.textContent += today.getFullYear();
lastModified.textContent += document.lastModified;

// Giving values directly until I know how to get data from third party API's
temperature.textContent = `${(temperatureValue = 32)} °F`;
wind.textContent = `${(windSpeedValue = 14)} mph`;
windChill.textContent = calculateWindChill(temperatureValue, windSpeedValue);

function calculateWindChill(temperature, windSpeed) {
  if (temperature > 50 || windSpeed < 3) {
    return "N/A";
  }

  const windChill =
    35.74 +
    0.6215 * temperature -
    35.75 * Math.pow(windSpeed, 0.16) +
    0.4275 * temperature * Math.pow(windSpeed, 0.16);

  return `${windChill.toFixed(2)} °F`;
}