import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import LandingPage from './views/LandingPage';
import Product from './views/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element= {<LandingPage/>} />
            <Route path="products/:product" element={ <Product/> }/>
            {/* <Route path="*" element= {<Error/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
