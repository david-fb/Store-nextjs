import styles from './index.module.scss';

export default function CategoryItemLoading() {
  return (
    <div className={styles.CategoryItemLoading}>
      <div className={`${styles['CategoryItemLoading-image']} ${styles['loading']}`}></div>
      <div className={`${styles['CategoryItemLoading-info']}`}>
        <div className={`${styles['CategoryItemLoading-info-text']} ${styles['loading']}`}></div>
        <div className={`${styles['CategoryItemLoading-info-link']} ${styles['loading']}`}></div>
      </div>
    </div>
  );
}
