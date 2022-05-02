import styles from '@styles/NotFound.module.scss';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import NotFoundImage from '@images/sad.png';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <div className={styles['NotFound']}>
        <div className={styles['NotFound-container']}>
          <div className={styles['NotFound-container-message']}>
            <figure className={styles['NotFound-container-message-figure']}>
              <Image src={NotFoundImage} alt="Not Found" layout="fill" objectFit="contain" />
            </figure>
            <div className={styles['NotFound-container-message-text']}>
              <h1>404 - PAGE NOT FOUND</h1>
              <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            </div>
          </div>
          <Link href="/">
            <a href="dummy" className={`primary-button ${styles['NotFound-container-link']}`}>
              GO HOME
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
