import { useState } from 'react';
import Image from 'next/image';
import styles from '@styles/OrderInfo.module.scss';

export default function OrderInfo({ items, total, date }) {
  const [isVisible, setIsVisible] = useState(false);
  const createdAt = new Date(date).toLocaleDateString().split('/').join('-');

  return (
    <>
      <div
        onClick={() => setIsVisible(!isVisible)}
        onKeyUp={() => setIsVisible(!isVisible)}
        role="button"
        tabIndex={0}
        className={styles['OrderInfo-container'] + ' ' + `${items.length > 1 ? 'pointer' : ''}`}
      >
        <div className={styles['OrderInfo-images']}>
          <figure>
            <Image src={items[0].image} alt={`${items[0].name}`} layout="fill" objectFit="cover" />
          </figure>
          {items?.length > 2 && (
            <div className={styles['second-item']}>
              <figure>
                <Image src={items[1].image} alt={`image-${items[1].name}`} layout="fill" objectFit="cover" />
              </figure>
              <div className={styles['product-cover']}></div>
              <p>{`${items.length} items`}</p>
            </div>
          )}
          {items?.length === 2 && (
            <figure>
              <Image src={items[1].image} alt={`image-${items[1].name}`} layout="fill" objectFit="cover" />
            </figure>
          )}
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
      {items?.length > 1 && isVisible && (
        <div className={styles['OrderInfo-details']}>
          {items?.map((item) => (
            <div className={styles['content']} key={`OrderInfo_item-${item?.id}`}>
              <figure>
                <Image src={item?.image} alt={item.name} layout="fill" objectFit="cover" />
              </figure>
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
