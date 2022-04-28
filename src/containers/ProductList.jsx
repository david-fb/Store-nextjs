import React, { useRef, useEffect, useState } from 'react';
import ProductItem from '@components/ProductItem';
import styles from '@styles/ProductList.module.scss';
import ProductItemLoading from '@components/skeletonLoading/ProductItem';

const productsLoading = [];
for (let i = 0; i < 10; i++) {
  productsLoading.push(<ProductItemLoading key={`productItem-loading-${i}`} />);
}

const ProductList = ({ products, title, paddingTop }) => {
  const container = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (container && paddingTop) {
      container.current.style.paddingTop = `${paddingTop}%`;
    }
  }, [container]);

  useEffect(() => {
    if (products?.length) setIsLoading(false);
  }, [products]);

  return (
    <section ref={container} className={styles['main-container'] + ' ' + 'padding-top:30px'}>
      {title && <h2 className={styles['title']}>{title}</h2>}
      <div className={styles['ProductList']}>
        {isLoading && productsLoading}
        {!isLoading && products?.map((product) => <ProductItem product={product} key={product.id} />)}
      </div>
    </section>
  );
};

export default ProductList;
