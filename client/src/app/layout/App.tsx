import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configStore";
import { setBasket } from "../../features/basket/basketSlice";
// interface Props {
//   produsts: Product
// }

function App() {
  const dispatch =  useAppDispatch();

  //const {setBasket} = useStoreContext();
  const [loading, setLoading]= useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType =  darkMode ? 'dark' : 'light'

useEffect(() => {
  const buyerId = getCookie('buyerId');
  if(buyerId) {
    agent.Basket.get()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }
  else {
    setLoading(false);
  }
},[dispatch])

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
if (loading) return <LoadingComponent message="initializing app ..." />
 // new - v6 <Route path="/" element={<Home />} />
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline/>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
       <Container>
        <Routes>
           <Route path='/' element={<HomePage />} />
           <Route path='/catalog' element={<Catalog />} />
           <Route path='/catalog/:id' element={<ProductDetails />} />
           <Route path='/about' element={<AboutPage/>} />
           <Route path='/contact' element={<ContactPage/>} />
           <Route path='/server-error' element={<ServerError/>} />
           <Route path='/basket' element={<BasketPage/>} />
           <Route path='/checkout' element={<CheckoutPage/>} />
           <Route path='*' element={<NotFound/>} />
        </Routes>
       
       </Container>
      
    </ThemeProvider>
  );
}

export default App;
