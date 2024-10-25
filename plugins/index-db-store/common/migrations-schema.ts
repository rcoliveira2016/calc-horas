import { NAME_OBJECT_STORE_CONFIGURACOES_HISTORICO, NAME_OBJECT_STORE_HISTORICO } from "../storages/constants";

export const migrations: Record<string, (db: IDBDatabase) => void> = {
  "1": (db: IDBDatabase): void => {
    db.createObjectStore(NAME_OBJECT_STORE_HISTORICO, {
      keyPath: "uid",
      autoIncrement: false,
    });

    db.createObjectStore(NAME_OBJECT_STORE_CONFIGURACOES_HISTORICO, {
      keyPath: "id",
      autoIncrement: false,
    });
  },
};
