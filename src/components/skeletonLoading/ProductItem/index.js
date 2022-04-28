import styles from './index.module.scss';

export default function ProductItemLoading() {
  return (
    <div className={styles['ProductItemLoading']}>
      <div className={`${styles['ProductItemLoading-image']} ${styles['loading']}`}></div>
      <div className={styles['ProductItemLoading-control']}>
        <div className={styles['ProductItemLoading-control-detail']}>
          <div className={`${styles['ProductItemLoading-control-detail-name']} ${styles['loading']}`}></div>
          <div className={`${styles['ProductItemLoading-control-detail-price']} ${styles['loading']}`}></div>
        </div>
        <div className={`${styles['ProductItemLoading-control-button']} ${styles['loading']}`}></div>
      </div>
    </div>
  );
}
