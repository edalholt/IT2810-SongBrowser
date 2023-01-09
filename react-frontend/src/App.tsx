import { useState, useMemo, createContext, useEffect } from "react";
import "./App.css";
import FrontPage from "./components/FrontPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PaletteMode, Button, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ switchMode: () => {} });

declare module "@mui/material/styles/createPalette" { //Inspired by: https://stackoverflow.com/questions/60424596/cant-customize-color-palette-types-on-material-ui-theme-in-typescript
  interface Palette {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
    textColor: string;
  }
  interface PaletteOptions {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
    textColor: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    buttonColor: true;
  }
}

declare module'@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    textColor: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    searchBar: true;
  }
}

const changeTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          custom: { 
            main: "#CAD2C5" 
          },
          divider: "#354F52",
          background: {
            default: "#52796f" 
          },
          buttonColor: {
            main: "#CAD2C5"
          },
          tableRow: "white",
          searchBar: "white",
          textColor: "white",
          button:{
            color: '#ffffff', 
            borderColor: '#ffffff'
          }
        }
      : {
          // Dark mode palette
          custom: { 
            main: "#2F3E46"
          },
          divider: grey[200],
          background: {
            default: "#354F52",
          },
          buttonColor: {
            main: "#2F3E46"
          },
          tableRow: grey[900],
          searchBar: grey[900],
          textColor: "white",
        }),
  },
});

function App() {
  const lightMode = localStorage.getItem("lightMode");
  // If stored mode is light use light, else use dark (default)
  const [mode, setMode] = useState<PaletteMode>((lightMode == "light") ? ("light") : ("dark"));
  
  // Save light or dark mode when changed
  useEffect(() => {
    localStorage.setItem("lightMode", String(mode))
  }, [mode])
  
  const colorMode = useMemo(
    () => ({
      switchMode: () => {
        setMode((prevMode: PaletteMode) => 
          prevMode === "light" ? "dark" : "light"
        )
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(changeTheme(mode)), [mode]);

  return (
    <>
      <Button sx={{m: 1, color: "#fff"}} title="toggle light/dark mode" onClick={colorMode.switchMode}>
        {theme.palette.mode === "dark" ? 
        <><Brightness7/><Typography color={"#fff"} ml={1}>Light Mode</Typography></>
        : <><Brightness4 /><Typography color={"#fff"} ml={1}>Dark Mode</Typography></>}
      </Button>
      <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FrontPage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
    </>
  );
}

export default App;
