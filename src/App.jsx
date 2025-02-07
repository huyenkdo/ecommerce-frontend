import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import Product from './views/Product';
import Wishlist from './views/Wishlist';
import Cart from './views/Cart';

function App() {
  return (
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
  );
}

export default App;
