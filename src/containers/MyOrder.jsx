import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import arrow from '@icons/flechita.svg';
import styles from '@styles/MyOrder.module.scss';

const MyOrder = () => {
  const { state, toggleOrder, sumTotal } = useContext(AppContext);

  return (
    <aside className={styles.MyOrder}>
      <div className={styles['MyOrder-container']}>
        <div className={styles['title-container']}>
          <Image className={styles['pointer']} src={arrow} alt="arrow" onClick={() => toggleOrder()} />
          <p className={styles['title']}>My order</p>
        </div>
        <div className={styles['my-order-content']}>
          {state.cart.length > 0 ? (
            <>
              <div className={styles['my-orders']}>
                {state.cart.map((product) => (
                  <OrderItem product={product} key={`orderItem-${product.id}`} />
                ))}
              </div>
              <div className={styles['order']}>
                <p>
                  <span>Total</span>
                </p>
                <p>${sumTotal()}</p>
              </div>
              <a className={'primary-button' + ' ' + styles['MyOrder-checkout']} href="/checkout">
                Checkout
              </a>
            </>
          )
          : 
          (
            <p className={styles["empty-cart-text"]}>Cart is empty</p>
          )
          }
        </div>
      </div>
    </aside>
  );
};

export default MyOrder;
