import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { theme } from "styles/Theme";

const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
