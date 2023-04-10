import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Card, TextField, Typography } from "@mui/material";

export default function WeatherSearch(props) {
  const { city, setCity, fetchData } = props;

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchData();
    }
  }

  return (
    <Card variant="outlined" sx={{ padding: 4, marginBottom: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 500 }}>
        Weather
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap="1em">
        <TextField
          label="City"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
        />
        <Button variant="contained" onClick={fetchData} size="medium">
          <SearchIcon />
        </Button>
      </Box>
    </Card>
  );
}
