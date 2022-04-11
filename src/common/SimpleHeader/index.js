import styles from './index.module.scss';

export default function ({title, image, color}) {
  return (
    <div className={styles['header-container'] + " " + `${color ? styles[`bg-${color}`] : ''}`}>
      {title && <h2>{title}</h2>}
      {image && <img src={image.src} />}
    </div>
  );
}
