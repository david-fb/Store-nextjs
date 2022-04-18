import React from 'react';
import ProductItem from '@components/ProductItem';
import styles from '@styles/ProductList.module.scss';

const ProductList = ({ products, title }) => {
  return (
    <section className={styles['main-container']}>
      {title && <h2 className={styles['title']}>{title}</h2>}
      <div className={styles['ProductList']}>
        {products?.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
