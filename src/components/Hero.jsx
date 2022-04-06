import PawPatrolImage from '@images/PawPatrol2.png';
import styles from '@styles/Hero.module.scss';

export default function Hero({title, info, color, image}) {
  if(!color) color = 'blue';
  if(!title) title = 'Default title';
  if(!info) info = 'Lorem Ipsum';
  if(!image) image = PawPatrolImage.src;
  return (
    <div className={styles['header-container'] + " " + styles[`bg-${color}`]}>
      <div className={styles['header-content']}>
        <div className={styles['content-text']}>
          <h2>{title}</h2>
          <p>{info}</p>
          <button className="primary-button">MORE DETAILS</button>
        </div>
        <img src={image} />
      </div>
    </div>
  );
}
