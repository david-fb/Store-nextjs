import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/CategoryItem.module.scss';

const CategoryItem = ({ category }) => {
  const links = {
    Maternidad: '/care-and-maternity',
    Ropa: '/clothes',
    Juguetes: '/toys',
  };
  return (
    <div className={styles.CategoryItem}>
      <figure className={styles['image-container']}>
        <Image src={category.image} layout="fill" priority objectFit="scale-down" alt={`category-image-${category.name}`} />
      </figure>
      <div className={styles['info-container']}>
        <p>{category.name}</p>
        <Link href={`${links[category.name]}`}>
          <a href="dummy" className={`primary-button`}>
            Go
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
