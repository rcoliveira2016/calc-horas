import type { TipoCalculo } from "~/stores/historico-horas/types";
import { getOpenDb } from "../open-db";
import { getObjectStoreAllValues, getObjectStoreTransaction, getTransaction } from "../open-session";
import { NAME_OBJECT_STORE_HISTORICO } from "./constants";
import { unwrapRequest } from "../unwrap-request";

export const HistoricoStorege = () => {
    return {
      getAll: async (): Promise<HistoricoStorage[]> => {
        return await getObjectStoreAllValues(await getOpenDb(), NAME_OBJECT_STORE_HISTORICO);
      },
      add: async (historico: HistoricoStorage) => {
        await getObjectStoreTransaction(
          await getOpenDb(),
          NAME_OBJECT_STORE_HISTORICO,
          async (objectStore) => {
            await unwrapRequest(objectStore.add(historico));
          }
        );
      },
      remove: async (key: IDBValidKey | IDBKeyRange) => {
        await getObjectStoreTransaction(
          await getOpenDb(),
          NAME_OBJECT_STORE_HISTORICO,
          async (objectStore) => {
            await unwrapRequest(objectStore.delete(key));
          }
        );
      },
      update: async (historico: HistoricoStorage) => {
        await getObjectStoreTransaction(
          await getOpenDb(),
          NAME_OBJECT_STORE_HISTORICO,
          async (objectStore) => {
            const dataStore = await unwrapRequest<HistoricoStorage>(await objectStore.get(historico.uid));
            const newData = { ...dataStore, ...historico };
            await unwrapRequest(objectStore.put(newData));
          }
        );
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