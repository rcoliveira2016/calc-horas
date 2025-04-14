import { COOKIES_NAME_TOKEN_AUTH_GITHUB } from '~/shared/constants/names-cookies'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const code = getQuery(event).code as string

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Código não fornecido',
    })
  }

  // Trocar o código pelo token de acesso no GitHub
  const tokenRes = await $fetch<{ access_token: string }>(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        client_id: config.public.githubClientId,
        client_secret: config.githubClientSecret,
        code,
      },
    },
  )

  setCookie(event, COOKIES_NAME_TOKEN_AUTH_GITHUB, tokenRes.access_token)
  return { message: 'Login realizado com sucesso' }
})
