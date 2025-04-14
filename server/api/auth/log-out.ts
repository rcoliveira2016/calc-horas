import { COOKIES_NAME_TOKEN_AUTH_GITHUB } from '~/shared/constants/names-cookies'

export default defineEventHandler(async (event) => {
  deleteCookie(event, COOKIES_NAME_TOKEN_AUTH_GITHUB) // Remove o cookie
  return { message: 'Logout realizado com sucesso' }
})
