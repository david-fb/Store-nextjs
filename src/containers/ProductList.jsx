import React, { useRef, useEffect } from 'react';
import ProductItem from '@components/ProductItem';
import styles from '@styles/ProductList.module.scss';

const ProductList = ({ products, title, paddingTop }) => {
  const container = useRef(null);

  useEffect(()=> {
    if(container && paddingTop){
      container.current.style.paddingTop = `${paddingTop}%`;
    }
  }, [container])
  return (
    <section ref={container} className={styles['main-container'] + " " + "padding-top:30px"}>
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
