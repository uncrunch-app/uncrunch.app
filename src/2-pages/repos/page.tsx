'use client'

import { useGetUserRepositoriesQuery } from '@/src/5-entities/user/api/repoApi'
import { useGetUserQuery } from '@/src/5-entities/user/api/userApi'
import React from 'react'

const UserRepositories = () => {
  const { data, error, isLoading } = useGetUserRepositoriesQuery()
  const { data: userData, error: useError, isLoading: userIsLoading } = useGetUserQuery()
  
  console.log(userData);
  
  // Проверка загрузки данных о репозиториях
  if (isLoading) return <div>Loading repositories...</div>
  if (error) return <div>Error loading repositories. Please try again later.</div>
  if (!data || data.length === 0) return <div>No repositories found for this user.</div>

  // Проверка загрузки данных о пользователе
  if (userIsLoading) return <div>Loading user data...</div>
  if (useError) return <div>Error loading user data. Please try again later.</div>
  if (!userData) return <div>No user data found.</div> // Дополнительная проверка на наличие данных

  return (
    <div>
      <h2>User Repositories</h2>
      <ul>
        {data.map((repo: any) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || 'No description available'}</p>
          </li>
        ))}
      </ul>
      
      <h2>User Data</h2>
      {/* Обработка объекта userData */}
      {userData ? (
        <div>
          <h3>{userData.username}</h3>
          <img src={userData.avatar_url} alt="" />
          <p>{userData.description || 'No description available'}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Profile Link
          </a>
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  )
}

export default UserRepositories
