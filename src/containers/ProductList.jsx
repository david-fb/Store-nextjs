import React, { useContext } from 'react';
import ProductItem from '@components/ProductItem';
import styles from '@styles/ProductList.module.scss';
import AppContext from '@context/AppContext';

const ProductList = () => {
	const { state } = useContext(AppContext)
	return (
		<section className={styles["main-container"]}>
			<div className={styles["ProductList"]}>
				{state.products.map(product => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</section>
	);
};

export default ProductList;
