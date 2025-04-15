import { ConfiguracoesHistoricoStorage } from './storages/configuracoes-historico-storege'
import { HistoricoStorege as CriarHistoricoStorege } from './storages/historico-storege'

export default defineNuxtPlugin({
  parallel: true,
  order: 1,
  enforce: 'pre',
  setup() {
    return {
      provide: {
        historicoHorasStorage: CriarHistoricoStorege(),
        configuracoesHistoricoStorage: ConfiguracoesHistoricoStorage(),
      },
    }
  },
})
