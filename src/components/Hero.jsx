import Image from 'next/image';
import PawPatrolImage from '@images/PawPatrol2.png';
import styles from '@styles/Hero.module.scss';

export default function Hero({ title, info, color, image, hasButton, textButton }) {
  if (!color) color = 'blue';
  if (!title) title = 'Default title';
  if (!info) info = 'Lorem Ipsum';
  if (!image) image = PawPatrolImage;
  if (!textButton) textButton = 'MORE DETAILS';
  return (
    <div className={styles['header-container'] + ' ' + styles[`bg-${color}`]}>
      <div className={styles['header-content']}>
        <div className={styles['content-text']}>
          <h1>{title}</h1>
          <p>{info}</p>
          {hasButton && <button className="primary-button">{textButton}</button>}
        </div>
        <figure>
          <Image src={image} layout="fill" priority objectFit="contain" alt="" />
        </figure>
      </div>
    </div>
  );
}
