import { styled } from "@mui/material/styles";
import { forwardRef, useState } from "react";

import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
} from "react-router-dom";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import HistoricalData from "./pages/HistoricalData";
import History from "./pages/History";
import Search from "./pages/Search";

import Theme from "./theme/Theme";

const drawerWidth = 240;

const Link = forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to, onClick } = props;

  return (
    <li>
      <ListItem button component={Link} to={to} onClick={onClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
          sx={{ textAlign: "right", marginLeft: "auto" }}
          primary={primary}
        />
      </ListItem>
    </li>
  );
}

function Root() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  }));

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Weather App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemLink
              icon={<SearchIcon />}
              primary="Search"
              to="/"
              onClick={handleDrawerClose}
            />
            <ListItemLink
              icon={<HistoryIcon />}
              primary="History"
              to="/history"
              onClick={handleDrawerClose}
            />
          </List>
        </Drawer>

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
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/history/:historicalId"
                element={<HistoricalData />}
              />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default Root;
