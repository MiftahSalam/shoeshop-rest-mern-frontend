import axios from 'axios';
import { MY_ORDER_LIST_RESET } from '../constants/order';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/user';

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/user`,
      { name, email, password },
      header
    );

    console.log('action-register data: ', data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('action-register error: ', error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message || error.message || 'Unknown Error',
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      header
    );

    console.log('action-login data: ', data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('action-login error: ', error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message || error.message || 'Unknown Error',
    });
  }
};

export const getUserDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/user/${id}`, header);

    console.log('action-get-user-detail data: ', data);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log('action-get-user-detail error: ', error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Unauthorized. Token Not found') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message || 'Unknown Error',
    });
  }
};

export const userUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      login: { userInfo },
    } = getState();
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/user/profile`, user, header);

    console.log('action-update data: ', data);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log('action-update error: ', error);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.message || error.message || 'Unknown Error',
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: MY_ORDER_LIST_RESET });
  document.location.href = '/login';
};
