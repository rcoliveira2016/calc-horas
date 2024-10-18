import { defineStore } from "pinia";
import { TipoCalculo, type CalcularHorasState } from "./types";

export const useHistoricoHorasStore = defineStore("historico-horas", {
  state: (): CalcularHorasState => ({
    historico: [],
    tempoInicial: 0,
    tempoFinal: 0,
    tempoAjustado: 0,
    tipoCalculo: TipoCalculo.vazio,
    tag: "",
    formato: "",
  }),
  getters: {
    totalResultado(): number {
      if (this.tipoCalculo === TipoCalculo.somar) {
        return Math.abs(this.tempoInicial + this.tempoFinal);
      }
      if (this.tipoCalculo === TipoCalculo.subtrair) {
        return Math.abs(this.tempoInicial - this.tempoFinal);
      }

      return 0;
    },
  },
  actions: {
    removerItem(uid: string) {
      this.historico = this.historico.filter((item) => item.uid !== uid);
    },
    addHistorico() {
      if (this.tipoCalculo == TipoCalculo.vazio) return;
      this.historico.push({
        uid: Date.now().toString(),
        tempoInicial: this.tempoInicial,
        tempoFinal: this.tempoFinal,
        tempoAjustado: this.tempoAjustado,
        tipoCalculo: this.tipoCalculo,
        tag: this.tag,
        formato: this.formato,
        dataInclusao: new Date(),
      });
      console.log(this.historico);
    },
  },
});
