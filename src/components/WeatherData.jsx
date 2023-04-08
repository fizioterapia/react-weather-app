import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import Icon from "./Icon";

function getIcon(weatherIcon) {
  return `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
}

function unixToTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("pl-PL");
}

function WeatherData({ data }) {
  return (
    <>
      <Typography variant="h4">{data.name}</Typography>
      <Icon src={getIcon(data.weather[0].icon)} />
      <Typography variant="h5">{data.weather[0].main}</Typography>
      <Typography color="text.secondary" gutterBottom>
        {data.weather[0].description}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 1.5 }}
      >
        <FontAwesomeIcon icon="fa-solid fa-temperature-full" size="2x" />
        <Typography color="text.secondary">
          {data.main.temp}&#8451; ({data.main.feels_like}&#8451;)
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 1.5 }}
      >
        <FontAwesomeIcon icon="fa-solid fa-wind" size="2x" />
        <Typography color="text.secondary">{data.wind.speed} m/s</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 1.5 }}
      >
        <FontAwesomeIcon icon="fa-solid fa-sun" size="2x" />

        <Typography color="text.secondary">
          {unixToTime(data.sys.sunrise)}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 1.5 }}
      >
        <FontAwesomeIcon icon="fa-solid fa-moon" size="2x" />

        <Typography color="text.secondary">
          {unixToTime(data.sys.sunset)}
        </Typography>
      </Box>
    </>
  );
}

export default WeatherData;
