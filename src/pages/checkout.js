import Head from 'next/head';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import styles from '@styles/Checkout.module.scss';
import lockImage from '@images/shopping-bags.png';
import { addOrder } from '@services/api/order';
import LoadingCircle from '@common/loadingCircle';
import useAlert from '@hooks/useAlert';
import ConfirmAlert from '@common/confirmAlert';

const Checkout = ({ token }) => {
  const { state, sumTotal, removeCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();
  const current = new Date();
  const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`;

  const handlePlaceOrder = () => {
    setLoading(true);
    addOrder(state.cart, token).then((res) => {
      if (res) {
        removeCart();
        setLoading(false);
        setAlert({
          active: true,
          message: 'Order placed!',
          type: 'success',
          autoClose: true,
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className={styles['Checkout']}>
        {alert?.active && <ConfirmAlert alert={alert} handleClose={toggleAlert} destination={'/orders'} />}
        <div className={styles['Login-header']}>
          <h2>Checkout</h2>
          <img src={lockImage.src} />
        </div>
        <div className={styles['Checkout-container']}>
          {loading && (
            <div className={styles['Checkout-loading']}>
              <LoadingCircle />
              <p>processing order...</p>
            </div>
          )}
          {!loading && state?.cart.length > 0 && (
            <>
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
                <button onClick={handlePlaceOrder} className={'primary-button' + ' ' + styles['Checkout-button']}>
                  Place Order
                </button>
              </div>
            </>
          )}
          {!loading && state?.cart.length === 0 && (
            <div className={styles['checkout-noItems']}>
              <p>There are no items added</p>
              <Link href={'/'}>
                <a className={'primary-button'}>Explore</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user) {
    return {
      props: {
        token: session.token,
      },
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
