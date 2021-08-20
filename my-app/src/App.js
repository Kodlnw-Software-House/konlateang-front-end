import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/Header/Navbar";
import { createTheme } from "@material-ui/core";
import WelcomePage from "./pages/welcome-page";
import Login from './components/login/login-form'

import { Switch, Route, Link } from "react-router-dom";

const patienTheme = createTheme({
  palette: {
    primary: {
      light: "#5a9bd7",
      dark: "#225b90",
      main: "#3182CE",
    },
    secondary: {
      dark: "#5a94af",
      light: "#9adcfb",
      main: "#81d4fa",
    },
  },
});
const hospitalTheme = createTheme({
  palette: {
    primary: {
      dark: "#2e7031",
      light: "#68b36b",
      main: "#43a047",
    },
    secondary: {
      dark: "#a73a38",
      light: "#f27573",
      main: "#ef5350",
    },
  },
});
const adminTheme = createTheme({
  palette: {
    primary: {
      dark: "#171717",
      light: "#4d4d4d",
      main: "#212121",
    },
    secondary: {
      dark: "#b2a4a6",
      light: "#ffeff1",
      main: "#ffebee",
    },
  },
});

function App() {
  const isLoggedIn = false;
  return (
    <ThemeProvider theme={patienTheme}>
      {/* check if user has login */}
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <WelcomePage />
          </Route>
        </Switch>
      )}
    </ThemeProvider>
  );
}

export default App;
