import {
  TEMPO_FINAL_PADRAO,
  TEMPO_INICIAL_PADRAO,
} from "~/shared/constants/configuracaoes";
import { getOpenDb } from "../common/open-db";
import {
  getObjectStoreTransaction,
  getObjectStoreValue,
} from "../common/open-session";
import { unwrapRequest } from "../common/unwrap-request";
import { NAME_OBJECT_STORE_CONFIGURACOES_HISTORICO } from "./constants";

const keyPathDefault = 1;

const defaultItem: ConfiguracoesHistoricoItemStorage = {
  subtrairHorasAlmoco: false,
  tempoAlmoco: 0,
  tempoFinal: TEMPO_FINAL_PADRAO,
  tempoInicial: TEMPO_INICIAL_PADRAO,
};

export const ConfiguracoesHistoricoStorage = () => {
  return {
    async set(item: ConfiguracoesHistoricoItemStorage): Promise<void> {
      await getObjectStoreTransaction(
        await getOpenDb(),
        NAME_OBJECT_STORE_CONFIGURACOES_HISTORICO,
        async (objectStore) => {
          const dataStore =
            await unwrapRequest<ConfiguracoesHistoricoItemStorage>(
              await objectStore.get(keyPathDefault)
            );

          if (!dataStore) {
            await unwrapRequest(
              objectStore.add({ id: keyPathDefault, ...item })
            );
            return;
          }

          const newData = { ...dataStore, ...item };
          await unwrapRequest(objectStore.put(newData));
        }
      );
    },
    async get(): Promise<ConfiguracoesHistoricoItemStorage> {
      const dataStore =
        await getObjectStoreValue<ConfiguracoesHistoricoItemStorage>(
          await getOpenDb(),
          NAME_OBJECT_STORE_CONFIGURACOES_HISTORICO,
          keyPathDefault
        );

      return dataStore || defaultItem;
    },
  };
};

export type ConfiguracoesHistoricoItemStorage = {
  subtrairHorasAlmoco: boolean;
  tempoAlmoco: number;
  formatacaoPadrao?: string;
  tempoInicial: number;
  tempoFinal: number;
};
