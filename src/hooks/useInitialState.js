import { useState, useEffect } from 'react';

let initialState = {
  cart: [],
  orderIsOpen: false,
  menuIsOpen: false,
  menuMobileIsOpen: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem('cart') && localStorage.getItem('cart') !== '') {
      setState({ ...state, cart: [...JSON.parse(localStorage.getItem('cart'))] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...state.cart]));
  }, [state?.cart]);

  const addToCart = (payload) => {
    delete payload.description;
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

  const removeCart = () => {
    setState({ ...state, cart: [] });
  };

  const toggleOrder = () => {
    setState((state) => {
      return {
        ...state,
        orderIsOpen: !state.orderIsOpen,
      };
    });
  };

  const toggleMenu = () => {
    setState({
      ...state,
      menuIsOpen: !state.menuIsOpen,
    });
  };

  const toggleMenuMobile = () => {
    setState((state) => {
      return {
        ...state,
        menuMobileIsOpen: !state.menuMobileIsOpen,
      };
    });
  };

  const sumTotal = () => {
    const reducer = (accumalator, currentValue) => accumalator + currentValue.price;
    const sum = state.cart.reduce(reducer, 0);
    return sum;
  };

  return {
    state,
    addToCart,
    removeCart,
    removeFromCart,
    toggleOrder,
    toggleMenu,
    toggleMenuMobile,
    sumTotal,
  };
};

export default useInitialState;
