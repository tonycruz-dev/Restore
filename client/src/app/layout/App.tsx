import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
// interface Props {
//   produsts: Product
// }

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType =  darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

function handleThemeChange() {
  setDarkMode(!darkMode);
}
 
  return (
    <ThemeProvider  theme={theme}>
      <CssBaseline/>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
       <Container>
         <Catalog />
       </Container>
      
    </ThemeProvider>
  );
}

export default App;