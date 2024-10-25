import { defineStore } from 'pinia'
import sumTotal from '~/utils/sum-total'
import {
  TipoCalculo,
  type CalcularHorasState,
  type HistoricoItemState,
} from './types'

export const useHistoricoHorasStore = defineStore('historico-horas', {
  state: (): CalcularHorasState => ({
    historico: [],
    tempoInicial: 0,
    tempoFinal: 0,
    tempoAjustado: 0,
    tipoCalculo: TipoCalculo.vazio,
    tag: '',
    formato: '',
    colunaEditando: '',
    itemSelecionadoEditando: '',
  }),
  getters: {
    totalResultado(): number {
      return sumTotal(this)
    },
    totalHistorico(): number {
      return this.historico.reduce((acc, curr) => acc + sumTotal(curr), 0)
    },
  },
  actions: {
    async inicializar() {
      const { $historicoHorasStorage, $configuracoesHistoricoStorage } =
        useNuxtApp()
      const historico = await $historicoHorasStorage.getAll()
      const configuracoes = await $configuracoesHistoricoStorage.get()

      this.formato = configuracoes.formatacaoPadrao || ''

      this.historico = historico.map((item) => ({
        ...item,
      }))
    },
    async removerItem(uid: string) {
      this.historico = this.historico.filter((item) => item.uid !== uid)
      const { $historicoHorasStorage } = useNuxtApp()
      await $historicoHorasStorage.remove(uid)
    },
    async alterarItem(item: HistoricoItemState) {
      const { $historicoHorasStorage } = useNuxtApp()
      await $historicoHorasStorage.update(item)
    },
    async limparHistorico() {
      const { $historicoHorasStorage } = useNuxtApp()
      this.historico.forEach(
        async (item) => await $historicoHorasStorage.remove(item.uid),
      )
      this.historico = []
    },
    async addHistorico() {
      if (this.tipoCalculo == TipoCalculo.vazio) return

      const item: HistoricoItemState = {
        uid: Date.now().toString(),
        tempoInicial: this.tempoInicial,
        tempoFinal: this.tempoFinal,
        tempoAjustado: this.tempoAjustado,
        tipoCalculo: this.tipoCalculo,
        tag: this.tag,
        formato: this.formato,
        dataInclusao: new Date(),
      }
      const { $historicoHorasStorage, $configuracoesHistoricoStorage } =
        useNuxtApp()

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
          ((tempoFinalHoras >= 12 &&
            tempoFinalMunitos >= tempoAlmocoEmMunitos) ||
            tempoFinalHoras > 12)
        ) {
          item.tempoAjustado = -1 * configuracoesHistoricoStorage.tempoAlmoco
        }
      }

      this.historico.push(item)

      $historicoHorasStorage.add(item)
    },
  },
})
