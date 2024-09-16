'use client'

import Image from 'next/image'
import img from './s.gif'
import styles from './SecretPage.module.scss'
import Button from '@/src/6-shared/ui/buttons/Button'
import { Typography } from '@mui/material'

const SecretPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        You&apos;re not supposed to be here, but since you are — enjoy the view!
      </Typography>
      <Image src={img} alt="Secret GIF" width={300} height={390} priority />

      <Button color="primary">
        Primary Button
      </Button>
      <Button color="secondary">
        Secondary Button
      </Button>
      <Button color="success">
        Secondary Button
      </Button>
    </div>
  )
}

export default SecretPage
