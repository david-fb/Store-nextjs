import React, { useState, useEffect } from 'react';
import CategoryItem from '@components/CategoryItem';
import { getCategories } from '@services/api/categories';
import CategoryItemLoading from '@components/skeletonLoading/CategoryItem';
import styles from '@styles/CategoryList.module.scss';

const categoriesLoading = [];
for (let i = 0; i < 3; i++) {
  categoriesLoading.push(<CategoryItemLoading key={`categoryItem-loading-${i}`} />);
}

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    return () => {
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (categories?.length) setIsloading(false);
  }, [categories]);

  return (
    <div className={styles.CategoryList}>
      <h2 className={styles['title']}>Categories</h2>
      <div className={styles['list']}>
        {isLoading && categoriesLoading}
        {!isLoading && categories?.map((category) => <CategoryItem category={category} key={category.id} />)}
      </div>
    </div>
  );
};

export default CategoryList;
