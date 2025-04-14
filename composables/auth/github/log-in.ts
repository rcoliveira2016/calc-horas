import { useNotificationError } from '~/composables/notifications/use-notification'

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

    if (!code) return
    try {
      await $fetch('/api/auth/github', { params: { code } })
      router.push('/')
    } catch (error) {
      useNotificationError(
        'Erro ao autenticar',
        'Não foi possível autenticar com o GitHub',
      )
      console.error('Erro ao autenticar:', error)
    }
  })
}
