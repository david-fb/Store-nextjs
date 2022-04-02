import React, { useState, useEffect } from 'react';
import AppContext from '@context/AppContext';
import CategoryItem from '@components/CategoryItem';
import styles from '@styles/CategoryList.module.scss';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories(){
            try {
                const response = await axios.get(endPoints.categories.getCategories);
                setCategories(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

	return (
        <div className={styles.CategoryList}>
            <h2 className={styles["title"]}>Categories</h2>
            <div className={styles["list"]}>
                {categories?.map(category => (
                    <CategoryItem category={category} key={category.id} />
                ))}
            </div>
        </div>
	);
};

export default CategoryList;