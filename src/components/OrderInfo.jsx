import React, { useState, useEffect } from 'react';
import styles from '@styles/OrderInfo.module.scss';

export default function OrderInfo({ items, total, date }) {
  const [isVisible, setIsVisible] = useState(false);
  const createdAt = new Date(date).toLocaleDateString().split('/').join('-');

  return (
    <>
      <div onClick={() => setIsVisible(!isVisible)} className={styles['OrderInfo-container'] + ' ' + `${items.length > 1 ? 'pointer' : ''}`}>
        <div className={styles['OrderInfo-images']}>
          <img className={styles['first-item']} src={items[0].image} alt={`${items[0].name}`} />
          {items?.length > 2 && (
            <div className={styles['second-item']}>
              <img src={items[1].image} alt={`image-${items[1].name}`} />
              <p>{`${items.length} items`}</p>
              <div className={styles['product-cover']}></div>
            </div>
          )}
          {items?.length === 2 && <img src={items[1].image} alt={`image-${items[1].name}`} />}
        </div>

        {items?.length === 1 && (
          <div className={styles['one-item-info']}>
            <p className={styles['product-name']}>{`${items[0].name}`}</p>
            <p className={styles['product-amount']}>{`Amount x${items[0].OrderProduct.amount}`}</p>
          </div>
        )}
        {items?.length > 1 && <button className={'primary-button' + ' ' + styles['show-items']}>Show Items</button>}
        <div>
          <p className={styles['date']}>{`Date: ${createdAt}`}</p>
          <p className={styles['total']}>{`Total: $${total}`}</p>
        </div>
      </div>
      {/* Order product details */}
      {(items?.length > 1 && isVisible) && (
        <div className={styles['OrderInfo-details']}>
                {items?.map((item) => (
                    <div className={styles['content']} key={`OrderInfo_item-${item?.id}`}>
                        <img src={item?.image} alt="" />
                        <div className={styles['info']}>
                            <p>{item?.name}</p>
                            <p>{`Amount x${item?.OrderProduct.amount}`}</p>
                        </div>
                        <p className={styles['price']}>{`Price : ${item?.price * item?.OrderProduct?.amount}`}</p>
                    </div>
                ))}
        </div>
      )}
    </>
  );
}
