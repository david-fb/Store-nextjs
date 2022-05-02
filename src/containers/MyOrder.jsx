import { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import arrow from '@icons/flechita.svg';
import styles from '@styles/MyOrder.module.scss';

const MyOrder = () => {
  const { state, toggleOrder, sumTotal, toggleMenu } = useContext(AppContext);
  const myOrderRef = useRef();

  const closeMyOrder = () => {
    myOrderRef.current.classList.add(styles['menuOut']);
    setTimeout(() => {
      toggleOrder();
    }, 300);
  };
  useEffect(() => {
    if (state.menuIsOpen) {
      toggleMenu();
    }
    const handleClickOutside = (e) => {
      if (state.orderIsOpen && myOrderRef.current && !myOrderRef.current.contains(e.target)) {
        closeMyOrder();
      }
    };
    //add event listener
    document.addEventListener('click', handleClickOutside);
    //clear event
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <aside className={styles.MyOrder} ref={myOrderRef}>
      <div className={styles['MyOrder-container']}>
        <div className={styles['title-container']}>
          <Image className={styles['pointer']} src={arrow} alt="arrow" onClick={closeMyOrder} />
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
              <Link href="/checkout">
                <a href="dummy" className={'primary-button' + ' ' + styles['MyOrder-checkout']}>
                  Checkout
                </a>
              </Link>
            </>
          ) : (
            <p className={styles['empty-cart-text']}>Cart is empty</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MyOrder;
