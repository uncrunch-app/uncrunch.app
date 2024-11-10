import NextTopLoader from 'nextjs-toploader'

export const PageLoader = () => {
  return (
    <NextTopLoader
      color="hsl(var(--nextui-primary))"
      height={4}
      showSpinner={false}
    />
  )
}
