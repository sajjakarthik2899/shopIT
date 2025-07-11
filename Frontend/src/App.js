import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/Products/productDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword.jsx';
import Cart from './components/Cart/cart.jsx';
import Shipping from './components/Cart/shipping.jsx';
import ConfirmOrderDetails from './components/Cart/confirmOrderDetails.jsx';
import Payment from './components/Cart/payment.jsx';
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Toaster position="top-right" reverseOrder={false} />
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/confirm_order" element={<ConfirmOrderDetails />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          <Footer />
        </header>
      </div>
    </Router>
  );
};

export default App;
