import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cart';
import {
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/order';
import { logout } from './user';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post('/api/order', order, header);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('actions-createOrder error message: ', message);
    if (message === 'Unauthorized. Token Not found') {
      dispatch(logout());
    }
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, header);

    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('actions-createOrder error message: ', message);
    if (message === 'Unauthorized. Token Not found') {
      dispatch(logout());
    }
    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/order/${id}/pay`,
      paymentResult,
      header
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('actions-createOrder error message: ', message);
    if (message === 'Unauthorized. Token Not found') {
      dispatch(logout());
    }
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const myOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order`, header);

    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('actions-createOrder error message: ', message);
    if (message === 'Unauthorized. Token Not found') {
      dispatch(logout());
    }
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: message });
  }
};
