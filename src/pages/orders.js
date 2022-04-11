import React from 'react';
import styles from '@styles/Orders.module.scss';
import checklistImage from '@images/checklist.png';
import { getSession } from 'next-auth/react';
import { getAllOrders } from '@services/api/order';
import SimpleHeader from '@common/SimpleHeader';

const Orders = ({ orders }) => {
  console.log(orders);
  return (
    <div className={styles['Orders']}>
      <SimpleHeader title={'My orders'} image={checklistImage} color={'green2'}/>
      <div className={styles['Orders-container']}>
        <div className={styles['Orders-content']}></div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session && !session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const orders = await getAllOrders(session.token);

  return {
    props: {
      orders: orders,
    },
  };
};

export default Orders;
