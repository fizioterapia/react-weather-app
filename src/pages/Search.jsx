import { useEffect, useState } from "react";

import { Box, Breadcrumbs, Card, Link, Typography } from "@mui/material";
import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";
import WeatherData from "../components/WeatherData";
import WeatherSearch from "../components/WeatherSearch";

import { Link as RouterLink } from "react-router-dom";
import callAPI from "../utils/openWeatherAPI";

export default function Search() {
  const [history, setHistory] = useState(() => {
    const tempHistory = localStorage.getItem("WeatherHistory");

    if (tempHistory == null) {
      return [];
    }

    return JSON.parse(tempHistory);
  });
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHistory((currentHistory) => {
      if (data == null) return currentHistory;

      const newHistory = [
        {
          id: crypto.randomUUID(),
          data: data,
          created_at: Date.now(),
        },
        ...currentHistory,
      ];

      localStorage.setItem("WeatherHistory", JSON.stringify(newHistory));

      return newHistory;
    });
  }, [data]);

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
    <>
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Typography variant="body1">App</Typography>
        <Link color="inherit" component={RouterLink} to="/">
          Search
        </Link>
      </Breadcrumbs>
      <WeatherSearch city={city} setCity={setCity} fetchData={fetchData} />
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
    </>
  );
}
