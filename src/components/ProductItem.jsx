import React, { useContext } from 'react';
import Image from 'next/image';
import styles from '@styles/ProductItem.module.scss';
import AppContext from '@context/AppContext';
import addToCartImage from '@icons/bt_add_to_cart.svg';
import addedToCartImage from '@icons/bt_added_to_cart.svg';

const ProductItem = ({ product }) => {
	const { state, addToCart } = useContext(AppContext);

	const handleClick = item => {
		console.log('in cart: ', state.cart.includes(item));
		addToCart(item);
	};

	return (
		<div className={styles["ProductItem"]}>
			<Image src={product.image} alt={product.name} width={240} height={240}/>
			<div className={styles["product-info"]}>
				<div>
					<p>${product.price}</p>
					<p>{product.description}</p>
				</div>
				<figure className={styles["more-clickable-area"]}>
					<button onClick={() => handleClick(product)}>
						{  state.cart.includes(product) ? <Image className={styles["disabled", "add-to-cart-btn"]} src={addedToCartImage} alt="added to cart"/>  : <Image className={styles["add-to-cart-btn", "pointer"]} src={addToCartImage} alt="add to cart"/> }
					</button>
				</figure>
			</div>
		</div>
	);
};

export default ProductItem;
