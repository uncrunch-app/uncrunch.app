'use client'

import Image from 'next/image'
import img from './s.gif'
import styles from './SecretPage.module.scss'
import { useTranslations } from 'next-intl'

const SecretPage = () => {
  const t = useTranslations('Pages.secret')

  return (
    <div className={styles.container}>
      <p>{t('message')}</p>
      <Image
        src={img}
        alt="Secret GIF"
        className={styles.image}
        width={300}
        height={390}
        priority
      />
    </div>
  )
}

export default SecretPage
