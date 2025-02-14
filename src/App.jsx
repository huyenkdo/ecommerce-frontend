import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import Product from './views/Product';
import Wishlist from './views/Wishlist';
import Cart from './views/Cart';
import { useEffect, useState } from 'react';
import ProductsContext from './contexts/products_context';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/products`;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      setProducts(result);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element= {<LandingPage/>} />
              <Route path="/wishlist" element= {<Wishlist/>} />
              <Route path="/cart" element= {<Cart/>} />
              <Route path="product/:product" element={ <Product/> }/>
              {/* <Route path="*" element= {<Error/>} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
