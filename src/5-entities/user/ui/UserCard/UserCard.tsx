/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './UserCard.module.scss'
import cn from 'classnames'

interface UserCardProps {
  avatar_url: string
  className?: string
}

const UserCard: React.FC<UserCardProps> = ({
  className,
  avatar_url,
  ...props
}) => (
  <div className={cn(styles.container, className)} {...props}>
    {/*<div className={styles.nameContainer}>
      <div className={styles.name}>{name}</div>
      <div className={styles.username}>@{login}</div>
    </div>*/}
    <img className={styles.avatar} src={avatar_url} alt="User Avatar" />
  </div>
)

export default UserCard
