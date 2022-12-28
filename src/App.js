import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CartScreen from './screens/Cart';
import HomeSceen from './screens/Home';
import LoginScreen from './screens/Login';
import NotFoundScreen from './screens/NotFound';
import PaymentScreen from './screens/Payment';
import PlaceOrderScreen from './screens/PlaceOrder';
import ProfileScreen from './screens/Profile';
import RegisterScreen from './screens/Register';
import ShippingScreen from './screens/Shipping';
import SingleProductScreen from './screens/SingleProduct';
import OrderScreen from './screens/Order';

import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRouter from './PrivateRouter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSceen />} exact />
        <Route path="/search/:keyword" element={<HomeSceen />} exact />
        <Route path="/page/:pagenumber" element={<HomeSceen />} exact />
        <Route
          path="/search/:keyword/page/:pagenumber"
          element={<HomeSceen />}
          exact
        />
        <Route path="/products/:id" element={<SingleProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route exact path="/profile" element={<PrivateRouter />}>
          <Route exact path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route exact path="/shipping" element={<PrivateRouter />}>
          <Route exact path="/shipping" element={<ShippingScreen />} />
        </Route>
        <Route exact path="/payment" element={<PrivateRouter />}>
          <Route exact path="/payment" element={<PaymentScreen />} />
        </Route>
        <Route exact path="/placeorder" element={<PrivateRouter />}>
          <Route exact path="/placeorder" element={<PlaceOrderScreen />} />
        </Route>
        <Route path="/order/:id" element={<PrivateRouter />}>
          <Route path="/order/:id" element={<OrderScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
