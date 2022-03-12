import React, { useContext } from 'react';
import AppContext from '@context/AppContext';
import CategoryItem from '@components/CategoryItem';
import styles from '@styles/CategoryList.module.scss';

const CategoryList = () => {
    const { state } = useContext(AppContext);
	return (
        <div className={styles.CategoryList}>
            <h2 className={styles["title"]}>Categories</h2>
            <div className={styles["list"]}>
                {state.categories.map(category => (
                    <CategoryItem category={category} key={category.id} />
                ))}
            </div>
        </div>
	);
};

export default CategoryList;