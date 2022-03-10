import React from 'react';
import ProductItem from '@components/ProductItem';
import useGetProducts from '@hooks/useGetProducts';
import styles from '@styles/ProductList.module.scss';

const API = 'https://plat-express-store.herokuapp.com/api/v1/products';

const ProductList = () => {
	const products = useGetProducts(API);

	return (
		<section className={styles["main-container"]}>
			<div className={styles["ProductList"]}>
				{products.map(product => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</section>
	);
};

export default ProductList;
