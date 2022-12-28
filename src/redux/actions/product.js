import axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADD_REVIEW_REQUEST,
  PRODUCT_ADD_REVIEW_SUCCESS,
  PRODUCT_ADD_REVIEW_FAIL,
} from '../constants/product';
import { logout } from './user';

export const productList =
  (keyword = ' ', pageNumber = ' ') =>
  async (dispatch) => {
    try {
      console.log('productList-action');
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/product?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.error('productList-action error message: ', error.message);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message || 'Unknown Error',
      });
    }
  };

export const productDetails = (id) => async (dispatch) => {
  try {
    console.log('productDetails-action');
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    console.log('productDetails-action payload: ', data);
  } catch (error) {
    console.error('productDetails-action error message: ', error.message);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: message || 'Unknown Error',
    });
  }
};

export const productAddReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADD_REVIEW_REQUEST });

      const {
        login: { userInfo },
      } = getState();
      const header = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/product/${productId}/reviews`,
        review,
        header
      );

      dispatch({ type: PRODUCT_ADD_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Unauthorized. Token Not found') {
        dispatch(logout());
      }
      dispatch({ type: PRODUCT_ADD_REVIEW_FAIL, payload: message });
    }
  };
