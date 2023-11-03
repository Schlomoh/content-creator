import { Provider as ReduxProvider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { css, Global } from "@emotion/react";

import { Dashboard, LoginPage } from "@/pages";
import { Navigation, PrivateWrapper } from "@/components";
import { theme } from "@/theme";
import { persistor, store } from "@/store";

// App.js
import "firebase/auth";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const globalStyles = css`
    body,
    html,
    #root {
      height: 100%;
      margin: 0;
    }
  `;

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <CssVarsProvider theme={theme} defaultMode={"dark"}>
          <Global styles={globalStyles} />
          <Navigation />

          <Routes>
            <Route
              path="/"
              element={
                <PrivateWrapper>
                  <Dashboard />
                </PrivateWrapper>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </CssVarsProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
