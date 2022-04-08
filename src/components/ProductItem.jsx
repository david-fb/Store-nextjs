import React, { useContext } from 'react';
import Image from 'next/image';
import styles from '@styles/ProductItem.module.scss';
import AppContext from '@context/AppContext';

const ProductItem = ({ product }) => {
  const { state, addToCart } = useContext(AppContext);

  let inCart = state?.cart.some((item) => item['id'] === product.id);

  const handleClick = (item) => {
    if (!inCart) {
      addToCart(item);
    }
  };

  return (
    <div className={styles['ProductItem']}>
      <Image src={product.image} alt={product.name} width={240} height={240} />
      <div className={styles['product-info']}>
        <div>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
        <figure>
          <button onClick={() => handleClick(product)} className={`primary-button ${styles['add-to-cart-btn']}  ${inCart ? styles['added-to-cart-btn'] : ''}`}>
            <span>+</span>
            ADD TO CART
          </button>
        </figure>
      </div>
    </div>
  );
};

export default ProductItem;
