import { TipoCalculo } from "~/stores/historico-horas/types";

export default (item: {
  tipoCalculo: TipoCalculo;
  tempoInicial: number;
  tempoFinal: number;
  tempoAjustado: number;
}) => {
  const tempoAjustado = item.tempoAjustado || 0;
  if (item.tipoCalculo === TipoCalculo.somar) {
    return Math.abs(item.tempoInicial + item.tempoFinal + tempoAjustado);
  }
  if (item.tipoCalculo === TipoCalculo.subtrair) {
    return Math.abs(item.tempoInicial - item.tempoFinal) + tempoAjustado;
  }

  return 0;
};