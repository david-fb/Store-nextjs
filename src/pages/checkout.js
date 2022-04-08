import Head from 'next/head';
import React, { useContext } from 'react';
import { getSession } from 'next-auth/react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import styles from '@styles/Checkout.module.scss';
import lockImage from '@images/shopping-bags.png';

const Checkout = () => {
  const { state, sumTotal } = useContext(AppContext);
  const current = new Date();
  const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className={styles['Checkout']}>
        <div className={styles['Login-header']}>
          <h2>Checkout</h2>
          <img src={lockImage.src} />
        </div>
        <div className={styles['Checkout-container']}>
          <div className={styles['Checkout-content']}>
            <h1 className={styles['title']}>My order</h1>
            <div className={styles['Checkout-info']}>
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
          <div className={styles['place-order']}>
            <button className={'primary-button' + " " + styles['Checkout-button']}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default Checkout;
