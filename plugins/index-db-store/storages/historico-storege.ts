import type { TipoCalculo } from '~/stores/historico-horas/types'
import { getOpenDb } from '../common/open-db'
import {
  getObjectStoreAllValues,
  getObjectStoreTransaction,
} from '../common/open-session'
import { unwrapRequest } from '../common/unwrap-request'
import { NAME_OBJECT_STORE_HISTORICO } from './constants'

export const HistoricoStorege = () => {
  return {
    async getAll(): Promise<HistoricoStorage[]> {
      return await getObjectStoreAllValues(
        await getOpenDb(),
        NAME_OBJECT_STORE_HISTORICO,
      )
    },
    async add(historico: HistoricoStorage) {
      await getObjectStoreTransaction(
        await getOpenDb(),
        NAME_OBJECT_STORE_HISTORICO,
        async (objectStore) => {
          await unwrapRequest(objectStore.add(historico))
        },
      )
    },
    async remove(key: IDBValidKey | IDBKeyRange) {
      await getObjectStoreTransaction(
        await getOpenDb(),
        NAME_OBJECT_STORE_HISTORICO,
        async (objectStore) => {
          await unwrapRequest(objectStore.delete(key))
        },
      )
    },
    async update(historico: HistoricoStorage) {
      await getObjectStoreTransaction(
        await getOpenDb(),
        NAME_OBJECT_STORE_HISTORICO,
        async (objectStore) => {
          const dataStore = await unwrapRequest<HistoricoStorage>(
            await objectStore.get(historico.uid),
          )
          const newData = { ...dataStore, ...historico }
          await unwrapRequest(objectStore.put(newData))
        },
      )
    },
  }
}

export type HistoricoStorage = {
  uid: string
  tempoInicial: number
  tempoFinal: number
  tempoAjustado: number
  tipoCalculo: TipoCalculo
  tag: string
  formato: string
  dataInclusao: Date
}
