import { Spinner } from "@nextui-org/react"

export const LoginSubmitLoader = () => {
  return (
    <div className="flex h-[70dvh] flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
