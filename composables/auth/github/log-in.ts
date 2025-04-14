export const useLogInGitHub = () => {
  const config = useRuntimeConfig()
  const clientId = config.public.githubClientId
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,gist`
}

export const useLogOutGitHub = async () => {
  await $fetch('/api/auth/log-out')
}

export const useCallbackLogInGitHub = () => {
  const route = useRoute()
  const router = useRouter()

  onMounted(async () => {
    const code = route.query.code
    console.log({ code })

    if (!code) return
    try {
      const { message } = await $fetch('/api/auth/github', { params: { code } })
      router.push('/')
    } catch (error) {
      console.error('Erro ao autenticar:', error)
    }
  })
}
