import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { savePaymentMethod } from '../redux/actions/cart';

const PaymentScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  if (!shippingAddress) {
    navigate('/shipping');
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-">
        <form
          className="Login2 col-md-8 col-1g-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>
          <button type="submit">
            <Link to="/placeorder" className="text-white">
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
