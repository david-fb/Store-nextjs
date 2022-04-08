import { useState, useEffect } from 'react';
import jsCookies from 'js-cookie';

let initialState = {
  cart: [],
  orderIsOpen: false,
  menuIsOpen: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(()=> {
    if(jsCookies.get('cart') && jsCookies.get('cart') !== '') {
      setState({...state, cart: [...JSON.parse(jsCookies.get('cart'))]});
    }
  }, []);

  useEffect(()=> {
    jsCookies.set('cart', JSON.stringify([...state.cart]));
  }, [state?.cart]);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.some((item) => item['id'] === payload.id) ? state.cart : [...state.cart, payload],
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
