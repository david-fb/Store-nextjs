import Head from 'next/head';
import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import styles from '@styles/Checkout.module.scss';

const Checkout = () => {
	const { state, sumTotal } = useContext(AppContext);
  const current = new Date();
  const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className={styles['Checkout']}>
        <div className={styles['Checkout-container']}>
          <h1 className={styles['title']}>My order</h1>
          <div className={styles['Checkout-content']}>
            <div className={styles['order']}>
              <p>
                <span>{date}</span>
                <span>{state.cart.length} articles</span>
              </p>
              <p>${sumTotal()}</p>
            </div>
          </div>
          {state.cart.map((product) => (
							<OrderItem product={product} key={`orderItem-${product.id}`} />
						))}
        </div>
      </div>
    </>
  );
};

export default Checkout;
