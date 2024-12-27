import { Button } from '@/shared/ui/buttons/Button'
import { InputActionButton } from '@/shared/ui/buttons/InputActionButton'
import { LoginFormControlledInput } from '../LoginFormControlledInput'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@/shared/ui/icons'
import { useTranslations } from 'next-intl'
import { GitHostingType } from '@/shared/types'
import { SetStateAction, useState } from 'react'
import { FormData } from '../LoginPage'
import { Control, FieldErrors } from 'react-hook-form'
import { Alert, button, Chip, Link } from '@nextui-org/react'
import { toCapitalizeCase } from '@/shared/utils/toCapitalizeCase'

interface LoginFormProps {
  handleSubmit: () => void
  gitHosting: GitHostingType
  control: Control<FormData, any>
  errors: FieldErrors<FormData>
  handleApiEndpointChange: () => void
  protocols: {
    key: string
    label: string
  }[]
  protocol: string
  apiEndpoint: string
  apiEndpointChange: boolean
  defaultApiEndpoint: () => void
  isSubmitting: boolean
  hasErrors: boolean
  handleGitHostingChange: (gitHosting: GitHostingType | null) => void
  handleProtocolChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isVisible: boolean
  toggleVisibility: () => void
  setApiEndpoint: (value: SetStateAction<string>) => void
  handleClearValue: (name: keyof FormData) => void
  serverError?: { title: string; status: number; message: string }
}

export const LoginForm = ({
  handleSubmit,
  gitHosting,
  control,
  errors,
  handleApiEndpointChange,
  protocols,
  protocol,
  apiEndpoint,
  apiEndpointChange,
  defaultApiEndpoint,
  isSubmitting,
  hasErrors,
  handleGitHostingChange,
  handleProtocolChange,
  isVisible,
  toggleVisibility,
  setApiEndpoint,
  handleClearValue,
  serverError,
}: LoginFormProps) => {
  const t = useTranslations('Pages.login')
  const [showAlertDescription, setShowAlertDescription] = useState(false)

  console.log(serverError)

  const handleShowAlertDescription = () => {
    setShowAlertDescription((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-light">{t('form.title')}</h1>
      <form
        autoComplete="off"
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          {gitHosting !== 'github' && (
            <LoginFormControlledInput
              name="instanceUrl"
              control={control}
              placeholder={'codeberg.org'}
              isInvalid={Boolean(errors.instanceUrl?.message)}
              errorMessage={errors.instanceUrl?.message}
              description={
                <>
                  {/*<span>{t('form.descriptions.instanceUrlInputMessage')}</span>
                <button>{t('form.descriptions.instanceUrlInputButton')}</button>*/}
                  <span>Хотите изменить api эндпоинт на кастомный? </span>
                  <Link
                    as="button"
                    type ='button'
                    role='button'
                    underline='always'
                    className="text-content4-foreground text-xs"
                    onPress={handleApiEndpointChange}
                  >
                    Нажмите сюда!
                  </Link>
                </>
              }
              type="text"
              startContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="protocol">
                    Protocol
                  </label>
                  <select
                    className="border-0 bg-transparent text-small outline-none"
                    id="protocol"
                    name="protocol"
                    value={protocol}
                    onChange={handleProtocolChange}
                  >
                    {/*<option>https://</option>
                  <option>http://</option>*/}

                    {protocols.map((protocol) => (
                      <option key={protocol.key}>{protocol.label}</option>
                    ))}
                  </select>
                  {/*<Select className="w-30" label="" variant="underlined">
                  {protocols.map((protocol) => (
                    <SelectItem key={protocol.key}>
                      {protocol.label}
                    </SelectItem>
                  ))}
                </Select>*/}
                </div>
              }
              endContent={
                <div className="pointer-events-none">
                  <span className="whitespace-nowrap text-small">
                    {apiEndpoint}
                  </span>
                </div>
              }
            />
          )}
          {apiEndpointChange && (
            <LoginFormControlledInput
              name="apiEndpoint"
              control={control}
              //defaultValue={apiEndpoint}
              placeholder={apiEndpoint}
              description={`${defaultApiEndpoint()} - Дефолтный эндпоинт ${toCapitalizeCase(gitHosting)} инстанса`}
              value={apiEndpoint}
              onValueChange={setApiEndpoint}
              isInvalid={Boolean(errors.apiEndpoint?.message)}
              errorMessage={errors.apiEndpoint?.message}
            />
          )}
          <LoginFormControlledInput
            name="token"
            control={control}
            placeholder={`${toCapitalizeCase(gitHosting)} токен`}
            isInvalid={Boolean(errors.token?.message)}
            errorMessage={errors.token?.message}
            hideEndContentWhenEmpty
            type={isVisible ? 'text' : 'password'}
            endContent={
              <div className="flex items-center">
                <InputActionButton
                  onPress={() => handleClearValue('token')}
                  hasError={hasErrors}
                  aria-label="clear input token"
                >
                  <XMarkIcon size={24} />
                </InputActionButton>
                <InputActionButton
                  onPress={toggleVisibility}
                  hasError={hasErrors}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashIcon size={24} />
                  ) : (
                    <EyeIcon size={24} />
                  )}
                </InputActionButton>
              </div>
            }
          />
        </div>

        <div className="flex w-full items-center justify-center">
          <Alert
            color="danger"
            hideIcon
            isVisible={Boolean(serverError)}
            classNames={{ base: 'items-start', mainWrapper: 'gap-1' }}
            radius="lg"
            description={
              //showAlertDescription && (
              <>
                <Link
                  color="danger"
                  size="sm"
                  underline="hover"
                  isExternal
                  showAnchorIcon
                  href={`https://developer.mozilla.org/docs/Web/HTTP/Status/${serverError?.status}`}
                >
                  {serverError?.status}: {serverError?.message}
                </Link>
                <Chip color="danger" variant="flat" size="sm">
                  MDN
                </Chip>
              </>
              //)
            }
            //endContent={
            //  <Button
            //    color="danger"
            //    className="px-8 font-medium"
            //    size="sm"
            //    variant="flat"
            //    onPress={handleShowAlertDescription}
            //  >
            //    {showAlertDescription ? 'Скрыть' : 'Подробнее'}
            //  </Button>
            //}
            title={serverError?.title}
            variant="bordered"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={Boolean(hasErrors)}
          >
            {t('form.buttons.logIn')}
          </Button>
          <Button
            color="secondary"
            isDisabled={isSubmitting}
            onPress={() => handleGitHostingChange(null)}
          >
            {t('form.buttons.back')}
          </Button>
        </div>
      </form>
    </div>
  )
}
