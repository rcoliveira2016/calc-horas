import type { GridDataItem } from "~/components/grid/types";

export type CalcularHorasState = {
  historico: HistoricoItem[];
  tempoInicial: number;
  tempoFinal: number;
  tempoAjustado: number;
  tipoCalculo: TipoCalculo;
  tag: string;
  formato: string;
};

export type HistoricoItem = {
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