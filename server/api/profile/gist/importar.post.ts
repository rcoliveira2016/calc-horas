import { COOKIES_NAME_TOKEN_AUTH_GITHUB } from '~/shared/constants/names-cookies'
import { obterGists } from './obterGists'

const NAME_ARQUIVO_GIST = 'horas_calculos_config_APP.json'
export default defineEventHandler(async (event) => {
  const token = getCookie(event, COOKIES_NAME_TOKEN_AUTH_GITHUB)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token não fornecido',
    })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  }

  const gist = await obterGists(headers, NAME_ARQUIVO_GIST)
  if (!gist) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Gist não encontrado',
    })
  }
  const file = gist.files[NAME_ARQUIVO_GIST]
  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Arquivo não encontrado no Gist',
    })
  }

  const response = await $fetch<string>(file.raw_url, {
    method: 'GET',
    headers: {
      Authorization: headers.Authorization,
    },
  })
  return {
    config: JSON.parse(response),
  }
})
