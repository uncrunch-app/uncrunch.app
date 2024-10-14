//// UserMenu.tsx
//'use client'

//import React, { useState } from 'react'
//import {
//  Menu,
//  MenuItem,
//  MenuList,
//  Divider,
//  Link,
//  ListItemIcon,
//  Typography,
//  ListItem,
//} from '@mui/material'
//import Button from '@mui/material/Button'
//import { UserCard } from '@/src/5-entities/user'
//import { CustomSessionUser } from '@/app/api/auth/authOptions'
//import { signOut } from 'next-auth/react'
//import cn from 'classnames'

//import styles from './UserMenu.module.scss'

//// Импортируем иконки
//import SettingsIcon from '@mui/icons-material/Settings'
//import LogoutIcon from '@mui/icons-material/Logout'

//interface UserMenuProps {
//  customUser: CustomSessionUser
//}

//const UserMenu: React.FC<UserMenuProps> = ({ customUser }) => {
//  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

//  const open = Boolean(anchorEl)
//  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//    setAnchorEl(event.currentTarget)
//  }

//  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
//    setAnchorEl(event.currentTarget)
//  }

//  const handleClose = () => {
//    setAnchorEl(null)
//  }

//  const handleSignOut = () => {
//    handleClose()
//    signOut()
//  }

//  return (
//    <>
//      <Button
//        className={styles.buttonCustom}
//        onClick={handleOpen}
//        id="fade-button"
//        aria-controls={open ? 'fade-menu' : undefined}
//        aria-haspopup="true"
//        aria-expanded={open ? 'true' : undefined}
//      >
//        <UserCard avatar_url={customUser.image!} />
//      </Button>
//      <Menu
//        id="fade-menu"
//        MenuListProps={{
//          'aria-labelledby': 'fade-button',
//        }}
//        anchorEl={anchorEl}
//        open={open}
//        onClose={handleClose}
//        keepMounted
//        anchorOrigin={{
//          vertical: 'bottom',
//          horizontal: 'right',
//        }}
//        transformOrigin={{
//          vertical: 'top',
//          horizontal: 'right',
//        }}
//        classes={{
//          paper: styles.menuPaper, // Применяем стиль к Paper
//          list: styles.menuList, // Применяем стиль к списку
//        }}
//      >
//        {/*<MenuList className={styles.list}>*/}
//        <MenuItem className={styles.info} disabled>
//          {customUser.name !== 'null' && (
//            <span className={styles.menuItemText}>{customUser.name}</span>
//          )}
//          <span className={styles.menuItemText}>@{customUser.login!}</span>
//          <div className={cn(styles.menuItemText, styles.menuItemTextService)}>
//            {customUser.service!}
//          </div>
//        </MenuItem>
//        <Divider className={styles.divider} />
//        <MenuItem onClick={handleClose} className={styles.menuItem}>
//          <ListItemIcon className={styles.menuItemIcon}>
//            <SettingsIcon />
//          </ListItemIcon>
//          <Link
//            href="/settings"
//            underline="none"
//            color="inherit"
//            className={styles.menuItemText}
//          >
//            Настройки
//          </Link>
//        </MenuItem>
//        <Divider className={styles.divider} />
//        <MenuItem onClick={handleSignOut} className={styles.menuItem}>
//          <ListItemIcon className={styles.menuItemIcon}>
//            <LogoutIcon />
//          </ListItemIcon>
//          <Typography variant="inherit">Выход</Typography>
//        </MenuItem>
//        {/*</MenuList>*/}
//      </Menu>
//    </>
//  )
//}

//export default UserMenu
