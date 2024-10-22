import { defineStore } from "pinia";
import { TipoCalculo, type CalcularHorasState, type HistoricoItemState } from "./types";
import sumTotal from "~/utils/sum-total";

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
      const { $historicoHorasStorage } = useNuxtApp();
      const historico = await $historicoHorasStorage.get();
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
      const { $historicoHorasStorage } = useNuxtApp();
      await $historicoHorasStorage.update(item);
    },
    async addHistorico() {
      if (this.tipoCalculo == TipoCalculo.vazio) return;

      const item: HistoricoItemState = {
        uid: Date.now().toString(),
        tempoInicial: this.tempoInicial,
        tempoFinal: this.tempoFinal,
        tempoAjustado: this.tempoAjustado,
        tipoCalculo: this.tipoCalculo,
        tag: this.tag,
        formato: this.formato,
        dataInclusao: new Date(),
      };

      this.historico.push(item);

      const { $historicoHorasStorage } = useNuxtApp();
      $historicoHorasStorage.add(item);
    },
  },
});
