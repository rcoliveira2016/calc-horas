import type { TipoCalculo } from "~/stores/historico-horas/types";
import { getOpenSession } from "../open-db";
import { unwrapRequest } from "../unwrap-request";

export const HistoricoStorege = () => {
    return {
      get: async (): Promise<HistoricoStorage[]> => {
        const db = await getOpenSession();
        const transaction = db.transaction("historico");

        return unwrapRequest(transaction.objectStore("historico").getAll());
      },
      add: async (historico: HistoricoStorage) => {
        const db = await getOpenSession();
        const transaction = db.transaction("historico", "readwrite");

        unwrapRequest(transaction.objectStore("historico").add(historico));
        transaction.commit();
        db.close();
      },
      remove: async (key: IDBValidKey | IDBKeyRange) => {
        const db = await getOpenSession();
        const transaction = db.transaction("historico", "readwrite");

        transaction.objectStore("historico").delete(key);
        transaction.commit();
        db.close();
      },
      update: async (historico: HistoricoStorage) => {
        const db = await getOpenSession();
        const transaction = db.transaction("historico", "readwrite");

        transaction.objectStore("historico").put(historico, historico.uid);
        transaction.commit();
        db.close();
      },
    };
}

export type HistoricoStorage = {
  uid: string;
  tempoInicial: number;
  tempoFinal: number;
  tempoAjustado: number;
  tipoCalculo: TipoCalculo;
  tag: string;
  formato: string;
  dataInclusao: Date;
}