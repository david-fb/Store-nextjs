import React, { useContext } from 'react';
import Image from 'next/image';
import AppContext from '../context/AppContext';
import close from '@icons/icon_close.png';
import styles from '@styles/OrderItem.module.scss';

const OrderItem = ({ product }) => {
  const { removeFromCart } = useContext(AppContext);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  return (
    <div className={styles.OrderItem}>
      <figure>
        <Image src={product?.image} alt={product?.name} width={70} height={70} />
      </figure>
      <p>{product?.name}</p>
      <p>${product?.price}</p>
      <Image className={'pointer'} src={close} alt="close" onClick={() => handleRemove(product)} />
    </div>
  );
};

export default OrderItem;
