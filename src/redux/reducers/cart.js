import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cart';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  const item = action.payload;

  switch (action.type) {
    case CART_ADD_ITEM:
      const storedItem = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (storedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === storedItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== item),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
