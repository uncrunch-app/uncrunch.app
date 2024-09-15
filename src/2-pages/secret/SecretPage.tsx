'use client';

import Image from 'next/image';
import img from './s.gif';
import styles from './SecretPage.module.scss'

const SecretPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.phrase}>You&apos;re not supposed to be here, but since you are — enjoy the view!</p>
      <Image src={img} alt="Secret GIF" width={300} height={390} priority/>
    </div>
  );
};

export default SecretPage;
