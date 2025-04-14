export const obterGists = async (
  headers: Record<string, string>,
  nomeArquivo: string,
) => {
  const response = await $fetch<IListGists[]>(
    'https://api.github.com/gists?per_page=100',
    {
      method: 'GET',
      headers,
    },
  )

  if (!response) {
    throw createError({
      statusCode: 500,
      message: `Erro na API do GitHub`,
    })
  }

  const gists = response.filter((gist) => {
    const files = Object.keys(gist.files)
    return files.includes(nomeArquivo)
  })

  return gists[0]
}

export interface IListGists {
  id: string
  description: string
  public: boolean
  files: {
    [key: string]: {
      raw_url: string
    }
  }
}
