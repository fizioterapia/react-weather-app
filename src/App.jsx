import { useState } from "react";

import WeatherData from "./components/WeatherData";
import ErrorBox from "./components/ErrorBox";
import Loader from "./components/Loader";

import Container from "@mui/material/Container";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import Theme from "./theme/Theme";

import callAPI from "./services/openWeatherAPI";

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchData();
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const response = await callAPI(city);

      if (response.status !== 200) {
        throw Error("Error has occured while loading data.");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      setData(null);
      setError(
        "Error has occured while loading data. Check your console for more information."
      );
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <Container
        className="App"
        maxWidth="sm"
        sx={{ height: "100vh", textAlign: "center" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh", width: "100%" }}
        >
          <Card variant="outlined" sx={{ padding: 4, marginBottom: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 500 }}>
              Weather
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="1em"
            >
              <TextField
                label="City"
                placeholder="Enter a city"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                size="small"
              />
              <Button variant="contained" onClick={fetchData} size="medium">
                Find
              </Button>
            </Box>
          </Card>
          <Box sx={{ minWidth: "70%" }}>
            <Card variant="outlined" sx={{ padding: 4 }}>
              {loading ? (
                <Loader />
              ) : data ? (
                <WeatherData data={data} />
              ) : error ? (
                <ErrorBox data={error} />
              ) : (
                <Typography variant="body1">
                  Enter a city to get started.
                </Typography>
              )}
            </Card>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
