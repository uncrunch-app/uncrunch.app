import { useRouter } from 'nextjs-toploader/app'

const useNavigateWithTopLoader = () => {
  const router = useRouter()

  const navigate = (to: string) => {
    router.push(to)
  }

  return navigate
}

export default useNavigateWithTopLoader
