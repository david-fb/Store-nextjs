import { useState } from 'react';
let initialState = {
  products : [],
  categories: [],
  cart: [],
  orderIsOpen: false,
  menuIsOpen: false,
};

const useInitialState = (products, categories) => {
  initialState.products = products;
  initialState.categories = categories;
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
