/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GithubUser } from '../..';
import styles from './UserCard.module.scss'

interface UserCardProps extends GithubUser {}

const UserCard: React.FC<UserCardProps> = ({ login, avatar_url, name }) => (
  <div className={styles.container}>
    <div className={styles.nameContainer}>
      <div className={styles.name}>{name}</div>
      <div className={styles.username}>@{login}</div>
    </div>
    <img className={styles.avatar} src={avatar_url} alt="User Avatar" />
  </div>
);

export default UserCard;
