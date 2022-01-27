import './App.css';
import Homepage from './pages/Homepage';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import './stylesheets/layout.css'
import './stylesheets/products.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage />}/>
          <Route path='/login' exact element={<Loginpage />}/>
          <Route path='/register' exact element={<RegisterPage />}/>
          <Route path='/productinfo/:productid' exact element={<ProductInfo />}/>
          <Route path='/cart' exact element={<CartPage />}/>
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
