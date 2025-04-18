import { defineStore } from "pinia";
import { useNotificationSuccess } from "~/composables/notifications/use-notification";
import setarConfiguracoesItemHistorico from "~/utils/historico-horas/setar-configuracoes-item-historico";
import sumTotal from "~/utils/sum-total";
import {
  TipoCalculo,
  type CalcularHorasState,
  type HistoricoItemState,
} from "./types";

export const useHistoricoHorasStore = defineStore("historico-horas", {
  state: (): CalcularHorasState => ({
    historico: [],
    tempoInicial: 0,
    tempoFinal: 0,
    tempoAjustado: 0,
    tipoCalculo: TipoCalculo.vazio,
    tag: "",
    formato: "",
    colunaEditando: "",
    itemSelecionadoEditando: "",
  }),
  getters: {
    totalResultado(): number {
      return sumTotal(this);
    },
    totalHistorico(): number {
      return this.historico.reduce((acc, curr) => acc + sumTotal(curr), 0);
    },
  },
  actions: {
    async inicializar() {
      const { $historicoHorasStorage, $configuracoesHistoricoStorage } =
        useNuxtApp();
      const historico = await $historicoHorasStorage.getAll();
      const configuracoes = await $configuracoesHistoricoStorage.get();

      this.tipoCalculo = TipoCalculo.subtrair;
      this.tempoInicial = 8.5;
      this.tempoFinal = 10;
      this.formato = configuracoes.formatacaoPadrao || "";
      this.historico = historico.map((item) => ({
        ...item,
      }));
    },
    async removerItem(uid: string) {
      this.historico = this.historico.filter((item) => item.uid !== uid);
      const { $historicoHorasStorage } = useNuxtApp();
      await $historicoHorasStorage.remove(uid);
    },
    async alterarItem(item: HistoricoItemState) {
      const index = this.historico.findIndex((i) => i.uid === item.uid);
      if (index === -1) {
        return;
      }
      this.historico[index] = item;
      const { $historicoHorasStorage } = useNuxtApp();
      await $historicoHorasStorage.update(item);
      useNotificationSuccess("sucesso", "item alterado com sucesso");
    },
    async limparHistorico() {
      const { $historicoHorasStorage } = useNuxtApp();
      this.historico.forEach(
        async (item) => await $historicoHorasStorage.remove(item.uid)
      );
      this.historico = [];
    },
    async addHistorico() {
      if (this.tipoCalculo == TipoCalculo.vazio) {
        return;
      }

      const item: HistoricoItemState = {
        uid: Date.now().toString(),
        tempoInicial: this.tempoInicial,
        tempoFinal: this.tempoFinal,
        tempoAjustado: this.tempoAjustado,
        tipoCalculo: this.tipoCalculo,
        tag: this.tag,
        dataInclusao: new Date(),
      };
      const { $historicoHorasStorage } = useNuxtApp();

      await setarConfiguracoesItemHistorico(item);

      this.historico.push(item);

      $historicoHorasStorage.add(item);

      useNotificationSuccess("sucesso", "item adicionado com sucesso");
    },
  },
});
