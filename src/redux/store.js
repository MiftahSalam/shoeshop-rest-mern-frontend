import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productAddReviewReducer,
  productDetailsReducer,
  productListReducer,
} from './reducers/product';
import { cartReducer } from './reducers/cart';
import {
  loginReducer,
  registerReducer,
  userDetailReducer,
  userUpdateReducer,
} from './reducers/user';
import {
  orderCreateReducer,
  orderDetail,
  orderList,
  orderPayment,
} from './reducers/order';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAddReview: productAddReviewReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetail,
  orderPay: orderPayment,
  orderList: orderList,
});

const cartItemForLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressForLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const userInfoFromLocalStorage =
  localStorage.getItem('userInfo') &&
  localStorage.getItem('userInfo') !== 'undefined'
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
  cart: {
    cartItems: cartItemForLocalStorage,
    shippingAddress: shippingAddressForLocalStorage,
  },
  login: { userInfo: userInfoFromLocalStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
