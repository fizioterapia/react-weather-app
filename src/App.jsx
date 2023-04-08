import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "./components/Button";
import Container from "./components/Container";
import Icon from "./components/Icon";
import InputBox from "./components/InputBox";
import InputContainer from "./components/InputContainer";
import InvalidContainer from "./components/InvalidContainer";
import InvalidField from "./components/InvalidField";
import WeatherContainer from "./components/WeatherContainer";
import WeatherDescription from "./components/WeatherDescription";
import WeatherField from "./components/WeatherField";

import callAPI from "./services/openWeatherAPI";

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchData();
    }
  }

  function getIcon(weatherIcon) {
    return `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
  }

  async function fetchData() {
    try {
      const response = await callAPI(city);

      if (response.status !== 200) {
        throw Error("Error has occured while loading data.");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(
        "Error has occured while loading data. Check your console for more information."
      );
    }
  }

  function unixToTime(timestamp) {
    const dateObject = new Date(timestamp * 1000);

    return dateObject.toLocaleTimeString("pl-PL");
  }

  return (
    <Container className="App">
      <InputContainer>
        <h1>Weather</h1>
        <InputBox
          placeholder="Enter a city"
          onChange={(e) => setCity(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={fetchData}>Submit</Button>
      </InputContainer>
      {data ? (
        <WeatherContainer>
          <h2>{data.name} </h2>
          <Icon src={getIcon(data.weather[0].icon)} />
          <h3>{data.weather[0].main}</h3>
          <WeatherDescription>{data.weather[0].description}</WeatherDescription>
          <WeatherField>
            <FontAwesomeIcon icon="fa-solid fa-temperature-full" />{" "}
            {data.main.temp}&#8451; ({data.main.feels_like}&#8451;)
          </WeatherField>
          <WeatherField>
            <FontAwesomeIcon icon="fa-solid fa-wind" /> {data.wind.speed} m/s{" "}
          </WeatherField>
          <WeatherField>
            <FontAwesomeIcon icon="fa-solid fa-sun" />{" "}
            {unixToTime(data.sys.sunrise)}
          </WeatherField>
          <WeatherField>
            <FontAwesomeIcon icon="fa-solid fa-moon" />{" "}
            {unixToTime(data.sys.sunset)}{" "}
          </WeatherField>
        </WeatherContainer>
      ) : (
        <InvalidContainer>
          <InvalidField>
            <FontAwesomeIcon icon="fa-solid fa-face-sad-tear" />
            {error ? error : "Provide valid city."}
          </InvalidField>
        </InvalidContainer>
      )}
    </Container>
  );
}

export default App;
