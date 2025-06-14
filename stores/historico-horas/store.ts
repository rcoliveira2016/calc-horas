import { defineStore } from "pinia";
import { useNotificationSuccess } from "~/composables/notifications/use-notification";
import {
  TEMPO_FINAL_PADRAO,
  TEMPO_INICIAL_PADRAO,
} from "~/shared/constants/configuracaoes";
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
      this.tempoInicial = configuracoes.tempoInicial || TEMPO_INICIAL_PADRAO;
      this.tempoFinal = configuracoes.tempoFinal || TEMPO_FINAL_PADRAO;
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
      if (index === -1) return;
      const old = this.historico[index];
      if (!hasChangesObj(old, item)) return;
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
    substituirHorario(acao: "left-right" | "right-left" | "invert") {
      if (acao === "left-right") {
        this.tempoFinal = this.tempoInicial;
      } else if (acao === "right-left") {
        this.tempoInicial = this.tempoFinal;
      } else if (acao === "invert") {
        const aux = this.tempoInicial;
        this.tempoInicial = this.tempoFinal;
        this.tempoFinal = aux;
      }
    },
  },
});
