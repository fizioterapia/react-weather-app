import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Link as BreadcrumbLink,
  Breadcrumbs,
  Card,
  Typography,
} from "@mui/material";
import ErrorBox from "../components/ErrorBox";
import Loader from "../components/Loader";
import WeatherData from "../components/WeatherData";

import { Link as RouterLink } from "react-router-dom";
import formatDate from "../utils/formatDate";

export default function HistoricalData() {
  const { historicalId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(() => {
    let tempHistory = localStorage.getItem("WeatherHistory");

    if (tempHistory == null) {
      setLoading(false);
      setError("This historical data does not exist!");
      return null;
    }

    tempHistory = JSON.parse(tempHistory);

    const weatherItem = tempHistory.find(
      (weather) => weather.id === historicalId
    );
    if (weatherItem == null) {
      setLoading(false);
      setError("This historical data does not exist!");
      return null;
    }

    setLoading(false);
    return weatherItem;
  });

  return (
    <>
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Typography variant="body1">App</Typography>
        <BreadcrumbLink color="inherit" component={RouterLink} to="/history">
          History
        </BreadcrumbLink>
        <BreadcrumbLink
          color="inherit"
          component={RouterLink}
          to={`/history/${historicalId}`}
        >
          Historical Data
        </BreadcrumbLink>
      </Breadcrumbs>
      <Box sx={{ minWidth: "70%" }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {formatDate(data.created_at)}
        </Typography>
        <Card variant="outlined" sx={{ padding: 4 }}>
          {loading ? (
            <Loader />
          ) : data ? (
            <WeatherData data={data.data} />
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
