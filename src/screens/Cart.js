import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { addToCart, removeFromCart } from '../redux/actions/cart';

const CartScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname ? location.pathname.split('/')[2] : '';
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  // console.log('CartScreen-productId: ', productId, 'CartScreen-qty: ', qty);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const checkoutHandler = (e) => {
    navigate(`/login?redirect=shipping`);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to={'/'}
              style={{ fontSize: '12px' }}
            >
              SHOPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                {cartItems.length}
              </Link>
            </div>
            {cartItems.map((item) => (
              <div key={item.product} className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandler(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price col-md-2 mt-3 mt-md-0 align-items-sm-end">
                  <h6>Price</h6>
                  <h4>${item.price}</h4>
                </div>
              </div>
            ))}
            <div className="total">
              <span className="sub">Total: </span>
              <span className="total-price">${total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkoutHandler}> Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
