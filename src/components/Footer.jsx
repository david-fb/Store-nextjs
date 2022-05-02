import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TwitterIcon from '@icons/twitter-brands.svg';
import GithubIcon from '@icons/github-brands.svg';
import LinkedinIcon from '@icons/linkedin-brands.svg';
import MailIcon from '@icons/envelope-solid.svg';
import styles from '@styles/Footer.module.scss';

const Footer = () => {
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText('davidbasto01@gmail.com');
    return Promise.reject('The Clipboard API is not avaible');
  };
  return (
    <footer className={styles.Footer}>
      <button onClick={copyToClipboard} className={styles['Footer-email']} title="click to copy email to clipboard">
        David Basto
        <figure className={styles['Footer-email_image']}>
          <Image src={MailIcon} alt="Email" layout="fill" />
        </figure>
        davidbasto01@gmail.com
      </button>
      <ul className={styles['Footer-social']}>
        <li>
          <Link href={'https://twitter.com/DavidB_M1'}>
            <a href="https://twitter.com/DavidB_M1" className={styles['Footer-social-item']} title="Twitter" target="_blank" rel="noreferrer">
              <Image src={TwitterIcon} alt="Twitter" layout="fill" />
            </a>
          </Link>
        </li>
        <li>
          <Link href={'https://github.com/david-fb'}>
            <a href="https://github.com/david-fb" className={styles['Footer-social-item']} title="Github" target="_blank" rel="noreferrer">
              <Image src={GithubIcon} alt="Github" layout="fill" />
            </a>
          </Link>
        </li>
        <li>
          <Link href={'https://www.linkedin.com/in/david-basto/'}>
            <a href="https://www.linkedin.com/in/david-basto/" className={styles['Footer-social-item']} title="Linkedin" target="_blank" rel="noreferrer">
              <Image src={LinkedinIcon} alt="Linkedin" layout="fill" />
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
