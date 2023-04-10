import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";

function ErrorBox({ data }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="1em"
    >
      <FontAwesomeIcon icon="fa-solid fa-face-sad-tear" size="2x" />
      <Typography color="text.secondary">{data}</Typography>
    </Box>
  );
}

export default ErrorBox;
