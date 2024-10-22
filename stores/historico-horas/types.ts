import type { GridDataItem } from "~/components/grid/types";

export type CalcularHorasState = {
  historico: HistoricoItemState[];
  tempoInicial: number;
  tempoFinal: number;
  tempoAjustado: number;
  tipoCalculo: TipoCalculo;
  tag: string;
  formato: string;
  colunaEditando: string;
  itemSelecionadoEditando: string;
};

export type HistoricoItemState = {
  uid: string;
  tempoInicial: number;
  tempoFinal: number;
  tempoAjustado: number;
  tipoCalculo: TipoCalculo;
  tag: string;
  formato: string;
  dataInclusao: Date;
} & GridDataItem;

export enum TipoCalculo {
    vazio = 0,
    somar = 1,
    subtrair = 2,
};