import React from 'react';
import Image from 'next/image';
import styles from '@styles/CategoryItem.module.scss';

const CategoryItem = ({category}) => {
    return (
        <div className={styles.CategoryItem}>
            <div className={styles["image-container"]}>
                <Image src={category.image} alt="" width={250} height={325}/>
            </div>
            <div className={styles["info-container"]}>
                <p>{category.name}</p>
                <button className={`primary-button`}>Ir</button>
            </div>
        </div>
    );
}

export default CategoryItem;