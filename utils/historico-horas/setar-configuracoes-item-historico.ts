import type { HistoricoItemState } from '~/stores/historico-horas/types'

export default async (item: HistoricoItemState) => {
  const { $configuracoesHistoricoStorage } = useNuxtApp()
  const configuracoesHistoricoStorage =
    await $configuracoesHistoricoStorage.get()

  if (configuracoesHistoricoStorage.subtrairHorasAlmoco) {
    const { hours: tempoInicialHoras } = decimalToHoursMinutos(
      item.tempoInicial,
    )
    const { hours: tempoFinalHoras, minutes: tempoFinalMunitos } =
      decimalToHoursMinutos(item.tempoFinal)
    const { minutes: tempoAlmocoEmMunitos } = decimalToHoursMinutos(
      configuracoesHistoricoStorage.tempoAlmoco,
    )
    if (
      tempoInicialHoras <= 12 &&
      ((tempoFinalHoras >= 12 && tempoFinalMunitos >= tempoAlmocoEmMunitos) ||
        tempoFinalHoras > 12)
    ) {
      item.tempoAjustado = -1 * configuracoesHistoricoStorage.tempoAlmoco
    }
  }
}
