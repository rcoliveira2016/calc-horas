import { COOKIES_NAME_TOKEN_AUTH_GITHUB } from '~/shared/constants/names-cookies'
import { obterGists } from './obterGists'
const NAME_ARQUIVO_GIST = 'horas_calculos_config_APP.json'
const criarGist = async (
  headers: Record<string, string>,
  payload: ICreateGitsPayload,
) => {
  const response = await $fetch('https://api.github.com/gists', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao criar o Gist na API do GitHub',
    })
  }

  return response
}
const atualizarGist = async (
  headers: Record<string, string>,
  id: string,
  payload: ICreateGitsPayload,
) => {
  const response = await $fetch(`https://api.github.com/gists/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload),
  })

  if (!response) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao atualizar o Gist na API do GitHub',
    })
  }

  return response
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, COOKIES_NAME_TOKEN_AUTH_GITHUB)

  const body = await readBody<IExportarGist>(event)
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

  const payload: ICreateGitsPayload = {
    description: 'Importado com sucesso',
    public: true,
    files: {
      [NAME_ARQUIVO_GIST]: {
        content: JSON.stringify(body.payload, null, 2),
      },
    },
  }
  const gist = await obterGists(headers, NAME_ARQUIVO_GIST)

  if (gist) {
    await atualizarGist(headers, gist.id, payload)
  } else {
    await criarGist(headers, payload)
  }
  return {}
})

interface ICreateGitsPayload {
  description: string
  public: boolean
  files: {
    [key: string]: {
      content: string
    }
  }
}

interface IExportarGist {
  id: string
  payload: {
    [key: string]: any
  }
}
