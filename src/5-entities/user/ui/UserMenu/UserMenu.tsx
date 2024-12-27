'use client'

import type { CustomSessionUser } from '@/next-app/api/auth/authOptions'

interface UserMenuProps {
  user: CustomSessionUser
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

import { ROUTES } from '@/shared/config'
import { useSessionUser } from '@/shared/hooks'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useNavigateWithTopLoader } from '@/shared/hooks'
import LocaleSwitcher from '@/shared/ui/LocaleSwitcher'
import { BlockedIcon, DashboardIcon, LanguageIcon, LogOutIcon } from '@/shared/ui/icons'

const UserInfoDescription = ({ user }: UserMenuProps) => {
  return (
    <span className="flex flex-col">
      <span>@{user.login}</span>
      <span className="capitalize">{user.gitHosting}</span>
    </span>
  )
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { sessionUser, isLoading } = useSessionUser()
  const t = useTranslations('Components.userMenu')
  const navigate = useNavigateWithTopLoader()

  if (!sessionUser) return

  const homeRoute = ROUTES.home(sessionUser.login)
  const secretRoute = ROUTES.secret(sessionUser.login)
  //const settingsRoute = ROUTES.settings(username!)
  //const notesRoute = ROUTES.notes(username!)
  //const todoRoute = ROUTES.todo(username!)
  //const boardsRoute = ROUTES.boards(username!)

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
          src={user.image!}
          fallback={user.image!}
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
            'max-h-svh-80px min-h-fit overflow-y-auto',
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
            textValue={user.name!}
          >
            <User
              name={user.name !== 'null' ? user.name : null}
              description={<UserInfoDescription user={user} />}
              classNames={{
                name: 'overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] font-light',
                description:
                  'text-default-800 text-sm font-extralight overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]',
              }}
              avatarProps={{
                size: 'md',
                src: user.image!,
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
            onClick={() => navigate(homeRoute)}
            startContent={<DashboardIcon size={iconSize} />}
          >
            {t('pages.home')}
          </DropdownItem>

          {/*<DropdownItem
            key="notes"
            textValue="Notes"
            className=""
            href={notesRoute}
            onClick={() =>
              NavigateWithTopLoader(notesRoute)
            }
            startContent={<PiNotePencil size={iconSize} />}
          >
            {t('pages.notes')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="todo"
            textValue="ToDo"
            className=""
            href={todoRoute}
            onClick={() =>
              NavigateWithTopLoader(todoRoute)
            }
            startContent={<GoTasklist size={iconSize} />}
          >
            {t('pages.todo')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="boards"
            textValue="Boards"
            className=""
            href={boardsRoute}
            onClick={() =>
              NavigateWithTopLoader(boardsRoute)
            }
            startContent={<PiKanban size={iconSize} />}
          >
            {t('pages.boards')}
          </DropdownItem>*/}
          {/*<DropdownItem
            key="settings"
            textValue="Settings"
            className=""
            href={settingsRoute}
            onClick={() =>
              NavigateWithTopLoader(settingsRoute)
            }
            startContent={<IoSettingsOutline size={iconSize} />}
          >
            {t('pages.settings')}
          </DropdownItem>*/}
          <DropdownItem
            key="secret"
            textValue="Secret"
            className=""
            onClick={() => navigate(secretRoute)}
            startContent={<BlockedIcon size={iconSize} />}
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
            startContent={<LanguageIcon size={iconSize} />}
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
            startContent={<LogOutIcon size={iconSize} />}
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
