'use client'

import type { CustomSessionUser } from '@/app/api/auth/authOptions'

interface UserMenuProps {
  customUser: CustomSessionUser
}

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react'
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2'
import { RxDashboard } from 'react-icons/rx'
//import { IoSettingsOutline } from 'react-icons/io5'
import { GoBlocked } from 'react-icons/go'
//import { IoGitCommitOutline } from 'react-icons/io5'
import { IoLanguageOutline } from 'react-icons/io5'
//import { PiNotePencil } from 'react-icons/pi'
//import { GoTasklist } from 'react-icons/go'
//import { PiKanban } from 'react-icons/pi'

import { IoColorPaletteOutline } from 'react-icons/io5'

import { routePaths } from '@/src/6-shared/services/routePaths'
import { useUsername } from '@/src/6-shared/services/useUsername'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import LocaleSwitcher from '@/src/6-shared/LocaleSwitcher'

const UserInfoDescription = ({ customUser }: UserMenuProps) => {
  return (
    <span className="flex flex-col">
      <span>@{customUser.login}</span>
      <span className="capitalize">{customUser.gitHosting}</span>
    </span>
  )
}

const UserMenu: FC<UserMenuProps> = ({ customUser }) => {
  const { username, isLoading } = useUsername()
  const t = useTranslations('UserMenu')

  const usernameRoute = routePaths.root(username!)
  const secretRoute = routePaths.secret(username!)
  //const settingsRoute = routePaths.settings(username!)
  //const notesRoute = routePaths.notes(username!)
  //const todoRoute = routePaths.todo(username!)
  //const boardsRoute = routePaths.boards(username!)

  const iconSize = 18

  const disabledKeys = ['repo']
  if (isLoading) {
    disabledKeys.push('settings')
  }

  return (
    <Dropdown
      radius="md"
      classNames={{
        content:
          'p-0 border-small border-divider bg-background rounded-large min-w-60 max-w-[300px] mt-1',
      }}
    >
      <DropdownTrigger>
        <Avatar
          radius="md"
          src={customUser.image!}
          fallback={customUser.image!}
          isBordered
          isFocusable={true}
          as={'button'}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={disabledKeys}
        className="p-3"
        classNames={{
          base: [
            'text-default-800 max-h-svh-80px min-h-fit overflow-y-auto',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="my-3 h-14 gap-3"
            textValue={customUser.name!}
          >
            <User
              name={customUser.name !== 'null' ? customUser.name : null}
              description={<UserInfoDescription customUser={customUser} />}
              classNames={{
                name: 'overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] font-light',
                description:
                  'text-default-800 text-sm font-extralight overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]',
              }}
              avatarProps={{
                size: 'md',
                src: customUser.image!,
              }}
            />
          </DropdownItem>
          {/*<DropdownItem
            key="repo"
            textValue="Repo"
            className=""
            startContent={<IoGitCommitOutline size={iconSize} />}
          >
            Repo
          </DropdownItem>*/}
          <DropdownItem
            key="dashboard"
            textValue="Dashboard"
            className=""
            href={usernameRoute}
            startContent={<RxDashboard size={iconSize} />}
          >
            {t('pages.home')}
          </DropdownItem>
          {/*<DropdownItem
            key="notes"
            textValue="Notes"
            className=""
            href={notesRoute}
            startContent={<PiNotePencil size={iconSize} />}
          >
            {t('pages.notes')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="todo"
            textValue="ToDo"
            className=""
            href={todoRoute}
            startContent={<GoTasklist size={iconSize} />}
          >
            {t('pages.todo')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="boards"
            textValue="Boards"
            className=""
            href={boardsRoute}
            startContent={<PiKanban size={iconSize} />}
          >
            {t('pages.boards')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="settings"
            textValue="Settings"
            className=""
            href={settingsRoute}
            startContent={<IoSettingsOutline size={iconSize} />}
          >
            {t('pages.settings')}
          </DropdownItem>*/}
          <DropdownItem
            key="secret"
            textValue="Secret"
            className=""
            href={secretRoute}
            startContent={<GoBlocked size={iconSize} />}
          >
            {t('pages.secret')}
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            isReadOnly
            key="language"
            className="cursor-default"
            textValue="Language selection"
            startContent={<IoLanguageOutline size={iconSize} />}
          >
            <LocaleSwitcher /> 
          </DropdownItem>
            {/*<DropdownItem
              isReadOnly
              key="theme"
              className="cursor-default"
              textValue="Theme selection"
              startContent={<IoColorPaletteOutline size={iconSize} />}
              endContent={
                <select
                  className="z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                  id="theme"
                  name="theme"
                >
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              }
            >
              {t('actions.themeOptions')}
            </DropdownItem>*/}
        </DropdownSection>

        <DropdownSection aria-label="Log Out">
          <DropdownItem
            key="logout"
            textValue="Log Out"
            startContent={<HiArrowLeftStartOnRectangle size={iconSize} />}
            className=""
            onClick={() => signOut()}
          >
            {t('actions.logOut')}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu
