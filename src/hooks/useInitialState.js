import { useState } from 'react';
import useGetProducts from '@hooks/useGetProducts';
const initialState = {
  products : [],
  cart: [],
  orderIsOpen: false,
  menuIsOpen: false,
};

const useInitialState = (products) => {
  initialState.products = products;
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.includes(payload) ? state.cart : [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((items) => items.id !== payload.id),
    });
  };

  const toggleOrder = () => {
    setState({
      ...state,
      orderIsOpen: !state.orderIsOpen,
    });
  };

  const toggleMenu = () => {
    setState({
      ...state,
      menuIsOpen: !state.menuIsOpen,
    });
  };

  const sumTotal = () => {
		const reducer = (accumalator, currentValue) => accumalator + currentValue.price;
		const sum = state.cart.reduce(reducer, 0);
    return sum;
	}

  return {
    state,
    addToCart,
    removeFromCart,
    toggleOrder,
    toggleMenu,
    sumTotal,
  };
};

export default useInitialState;
