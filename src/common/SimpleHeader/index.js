import styles from './index.module.scss';
import Image from 'next/image';

export default function ({title, image, color}) {
  return (
    <div className={styles['header-container'] + " " + `${color ? styles[`bg-${color}`] : ''}`}>
      {title && <h1>{title}</h1>}
      {image && <figure><Image src={image} layout='fill' priority objectFit='scale-down'/></figure>}
    </div>
  );
}
